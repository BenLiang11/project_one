export type VideoFormat = 
  | 'social-media' 
  | 'explainer' 
  | 'tutorial' 
  | 'advertisement';

export interface VideoProject {
  id: string;
  user_id: string;
  title: string;
  prompt: string;
  format: VideoFormat;
  script?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  video_url?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface VideoGenerationRequest {
  prompt: string;
  format: VideoFormat;
  title?: string;
}

export interface VideoGenerationResponse {
  projectId: string;
  status: string;
  message: string;
}

export interface ImagePrompt {
  prompt: string;
  index: number;
}

export interface GeneratedAssets {
  script: string;
  imagePrompts: ImagePrompt[];
  imageUrls: string[];
  audioUrl: string;
  videoUrl: string;
}

