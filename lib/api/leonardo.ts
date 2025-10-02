const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v1';

interface GenerateImageResponse {
  sdGenerationJob: {
    generationId: string;
  };
}

interface GetGenerationResponse {
  generations_by_pk: {
    status: string;
    generated_images: Array<{
      url: string;
      id: string;
    }>;
  };
}

export async function generateImage(prompt: string) {
  const response = await fetch(`${LEONARDO_API_URL}/generations`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'authorization': `Bearer ${process.env.LEONARDO_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876', // Leonardo Kino XL
      width: 1024,
      height: 768,
      num_images: 1,
    }),
  });

  const data: GenerateImageResponse = await response.json();
  return data.sdGenerationJob.generationId;
}

export async function getGenerationStatus(generationId: string) {
  const response = await fetch(
    `${LEONARDO_API_URL}/generations/${generationId}`,
    {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${process.env.LEONARDO_API_KEY}`,
      },
    }
  );

  const data: GetGenerationResponse = await response.json();
  return data.generations_by_pk;
}

export async function waitForImageGeneration(generationId: string, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await getGenerationStatus(generationId);
    
    if (status.status === 'COMPLETE') {
      return status.generated_images[0].url;
    }
    
    if (status.status === 'FAILED') {
      throw new Error('Image generation failed');
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  throw new Error('Image generation timeout');
}

