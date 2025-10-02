import OpenAI from 'openai';

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function generateVideoScript(prompt: string, format: string) {
  const openai = getOpenAIClient();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a professional video script writer. Create engaging, concise scripts for ${format} videos.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

export async function generateImagePrompts(script: string, numberOfImages: number = 3) {
  const openai = getOpenAIClient();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert at creating detailed image generation prompts. Generate visual descriptions that will work well with AI image generators.',
      },
      {
        role: 'user',
        content: `Based on this video script, generate ${numberOfImages} detailed image prompts that capture key visual moments:\n\n${script}`,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

