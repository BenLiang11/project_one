const CREATOMATE_API_URL = 'https://api.creatomate.com/v1';

interface VideoElement {
  type: string;
  source?: string;
  text?: string;
  duration?: number;
  time?: number;
  animations?: Array<{
    type: string;
    fade?: boolean;
    duration?: number;
  }>;
}

interface RenderResponse {
  id: string;
  status: string;
  url?: string;
}

export async function createVideo(
  images: string[],
  audioUrl: string,
  duration: number
) {
  const elements: VideoElement[] = [];
  
  // Calculate duration per image
  const imageDuration = duration / images.length;
  
  // Add images
  images.forEach((imageUrl, index) => {
    elements.push({
      type: 'image',
      source: imageUrl,
      duration: imageDuration,
      time: index * imageDuration,
      animations: [
        {
          type: 'scale',
          fade: true,
          duration: imageDuration,
        },
      ],
    });
  });
  
  // Add audio
  elements.push({
    type: 'audio',
    source: audioUrl,
    duration,
  });

  const response = await fetch(`${CREATOMATE_API_URL}/renders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CREATOMATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_id: null,
      modifications: {
        width: 1920,
        height: 1080,
        duration,
        elements,
      },
    }),
  });

  const data: RenderResponse[] = await response.json();
  return data[0].id;
}

export async function getRenderStatus(renderId: string) {
  const response = await fetch(
    `${CREATOMATE_API_URL}/renders/${renderId}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CREATOMATE_API_KEY}`,
      },
    }
  );

  const data: RenderResponse = await response.json();
  return data;
}

export async function waitForRender(renderId: string, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    const render = await getRenderStatus(renderId);
    
    if (render.status === 'succeeded') {
      return render.url;
    }
    
    if (render.status === 'failed') {
      throw new Error('Video rendering failed');
    }
    
    // Wait 5 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  
  throw new Error('Video rendering timeout');
}

