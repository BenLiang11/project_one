# AI Video Generator MVP

An AI-powered video generation platform where users can create short videos by simply entering a prompt. The app automatically generates scripts, images, voiceovers, and stitches everything into a polished video.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS v3, shadcn/ui
- **AI Services**:
  - OpenAI (GPT-4) - Script writing and image prompt generation
  - Leonardo AI - Image generation
  - ElevenLabs - Voiceover generation
  - Creatomate - Video stitching
- **Backend**: Supabase (Auth, Storage, Database)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- API keys for all services (see Configuration section)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ai-video-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Leonardo AI
LEONARDO_API_KEY=your_leonardo_api_key

# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Creatomate
CREATOMATE_API_KEY=your_creatomate_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔧 Configuration

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to get your URL and anon key
3. Run the database migration:
   - Go to SQL Editor in your Supabase dashboard
   - Copy and run the contents of `supabase/migrations/001_initial_schema.sql`
4. Create a storage bucket named `video-assets` (this should be done automatically by the migration)

### 2. OpenAI Setup

1. Get your API key from [platform.openai.com](https://platform.openai.com)
2. Add credits to your account
3. Add the key to your `.env.local`

### 3. Leonardo AI Setup

1. Sign up at [leonardo.ai](https://leonardo.ai)
2. Get your API key from the API section
3. Note: The app uses the "Leonardo Kino XL" model

### 4. ElevenLabs Setup

1. Create an account at [elevenlabs.io](https://elevenlabs.io)
2. Get your API key from settings
3. The app uses the default voice, but you can customize this in `lib/api/elevenlabs.ts`

### 5. Creatomate Setup

1. Sign up at [creatomate.com](https://creatomate.com)
2. Get your API key from the dashboard
3. Note: Video rendering may have usage limits on free plans

## 🚦 Running the Application

1. **Development mode**
```bash
npm run dev
```

2. **Build for production**
```bash
npm run build
npm start
```

3. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── generate-video/
│   │   └── projects/
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components (shadcn/ui)
├── lib/
│   ├── api/             # API client libraries
│   │   ├── openai.ts
│   │   ├── leonardo.ts
│   │   ├── elevenlabs.ts
│   │   └── creatomate.ts
│   ├── supabase/        # Supabase clients
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
├── supabase/
│   └── migrations/      # Database migrations
└── public/              # Static assets
```

## 🎨 Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# etc.
```

## 🔄 Video Generation Flow

1. User enters a prompt and selects video format
2. OpenAI generates a video script
3. OpenAI creates image prompts based on the script
4. Leonardo AI generates images from prompts
5. ElevenLabs creates voiceover from script
6. Assets are uploaded to Supabase Storage
7. Creatomate stitches everything into final video
8. Video URL is stored in database and shown to user

## 📝 Video Formats Supported

- Social Media (15-30s)
- Explainer Videos (30-60s)
- Tutorials (60-120s)
- Advertisements (15-30s)

## 🔐 Authentication

The app uses Supabase Auth. To implement:

1. Set up auth providers in your Supabase dashboard
2. Use the Supabase client in your components
3. Protected routes automatically redirect to login via middleware

## 🐛 Troubleshooting

**API Rate Limits**: All services have rate limits. Check your usage in each platform's dashboard.

**Image Generation Timeout**: Leonardo AI can be slow. Adjust the timeout in `lib/api/leonardo.ts` if needed.

**Video Rendering Fails**: Check Creatomate dashboard for error logs.

**Supabase Storage Issues**: Ensure the `video-assets` bucket exists and is public.

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
