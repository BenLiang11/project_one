import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';

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
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Generate script
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a professional video script writer. Create engaging, concise scripts optimized for video content. Focus on clear messaging, compelling storytelling, and viewer engagement. Keep scripts between 100-300 words unless specified otherwise.',
        },
        {
          role: 'user',
          content: `Create a video script for: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const script = completion.choices[0].message.content;

    if (!script) {
      throw new Error('Failed to generate script');
    }

    return NextResponse.json({ script });
  } catch (error: any) {
    console.error('Error generating script:', error);
    
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

