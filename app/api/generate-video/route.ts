import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateImagePrompts } from '@/lib/api/openai';
import { generateImage, waitForImageGeneration } from '@/lib/api/leonardo';
import { generateVoiceover } from '@/lib/api/elevenlabs';
import { createVideo, waitForRender } from '@/lib/api/creatomate';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, script, theme, music, voice, aspectRatio } = body;

    if (!title || !script) {
      return NextResponse.json(
        { error: 'Title and script are required' },
        { status: 400 }
      );
    }

    // Create project record
    const { data: project, error: projectError } = await supabase
      .from('video_projects')
      .insert({
        user_id: user.id,
        title,
        prompt: script,
        script,
        format: aspectRatio || '16:9',
        status: 'processing',
      })
      .select()
      .single();

    if (projectError) {
      throw new Error('Failed to create project');
    }

    // Start async video generation process (pass additional params)
    generateVideoAsync(project.id, script, aspectRatio, theme, music, voice);

    return NextResponse.json({
      projectId: project.id,
      status: 'processing',
      message: 'Video generation started',
    });
  } catch (error) {
    console.error('Error in video generation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function generateVideoAsync(
  projectId: string,
  script: string,
  format: string,
  theme?: string,
  music?: string,
  voice?: string
) {
  const supabase = await createClient();

  try {
    // Script is already provided by the user
    // Step 1: Generate image prompts
    const imagePromptsText = await generateImagePrompts(script, 3);
    
    if (!imagePromptsText) {
      throw new Error('Failed to generate image prompts');
    }
    
    const imagePrompts = imagePromptsText.split('\n').filter(p => p.trim());

    // Step 3: Generate images
    const imageGenerationIds = await Promise.all(
      imagePrompts.map(prompt => generateImage(prompt))
    );

    const imageUrls = await Promise.all(
      imageGenerationIds.map(id => waitForImageGeneration(id))
    );

    // Step 4: Generate voiceover
    const audioArrayBuffer = await generateVoiceover(script);
    
    // Upload audio to Supabase Storage
    const audioBuffer = Buffer.from(audioArrayBuffer);
    const audioFileName = `${projectId}/audio.mp3`;
    
    const { error: audioError } = await supabase.storage
      .from('video-assets')
      .upload(audioFileName, audioBuffer, {
        contentType: 'audio/mpeg',
      });

    if (audioError) throw audioError;

    const { data: { publicUrl: audioUrl } } = supabase.storage
      .from('video-assets')
      .getPublicUrl(audioFileName);

    // Step 5: Create final video
    const renderId = await createVideo(imageUrls, audioUrl, 30); // 30 seconds default
    const videoUrl = await waitForRender(renderId);

    // Update project with final video
    await supabase
      .from('video_projects')
      .update({
        video_url: videoUrl,
        thumbnail_url: imageUrls[0],
        status: 'completed',
      })
      .eq('id', projectId);
  } catch (error) {
    console.error('Error generating video:', error);
    
    await supabase
      .from('video_projects')
      .update({ status: 'failed' })
      .eq('id', projectId);
  }
}

