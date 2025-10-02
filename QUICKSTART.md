# Quick Start Guide

Get your AI Video Generator MVP running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional)

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Environment Variables (2 min)

Create a `.env.local` file in the root directory with your API keys:

```env
# Copy these and fill in your actual keys

# Supabase (get from https://supabase.com dashboard)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (get from https://platform.openai.com)
OPENAI_API_KEY=

# Leonardo AI (get from https://leonardo.ai)
LEONARDO_API_KEY=

# ElevenLabs (get from https://elevenlabs.io)
ELEVENLABS_API_KEY=

# Creatomate (get from https://creatomate.com)
CREATOMATE_API_KEY=

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note**: You need API keys from all services. See [SETUP.md](SETUP.md) for detailed instructions on getting each key.

## Step 3: Set Up Database (1 min)

1. Go to your Supabase dashboard
2. Click "SQL Editor"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and run the query

## Step 4: Run the App (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Test Video Generation

The API endpoint is ready at `/api/generate-video`. You can test it with:

```bash
curl -X POST http://localhost:3000/api/generate-video \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a video about the benefits of meditation",
    "format": "social-media",
    "title": "Meditation Benefits"
  }'
```

## What's Next?

Now that your backend is running, you need to build the frontend:

1. **Create Video Generation Form**
   - Use the UI components in `components/ui/`
   - Build a form to collect prompt and format
   - Submit to `/api/generate-video`

2. **Add Authentication**
   - Use Supabase Auth
   - Create login/signup pages
   - Protect routes with middleware

3. **Build Project Dashboard**
   - Fetch projects from `/api/projects`
   - Display video grid/list
   - Show generation status

4. **Add Video Player**
   - Display generated videos
   - Download functionality
   - Share options

## Project Structure

```
├── app/
│   ├── api/              # ✅ Ready to use
│   │   ├── generate-video/
│   │   └── projects/
│   └── page.tsx          # 👉 Start building here
├── components/ui/        # ✅ UI components ready
├── lib/                  # ✅ All integrations done
└── supabase/            # ✅ Database schema ready
```

## Available UI Components

You have these shadcn/ui components ready:
- `Button` - Various styles and sizes
- `Card` - For project cards
- `Input` - Form inputs
- `Label` - Form labels
- `Select` - Dropdown selects
- `Textarea` - Multi-line input

Add more with:
```bash
npx shadcn@latest add [component-name]
```

## Common Issues

**"Build failing"**
- Make sure all environment variables are set
- Check that `.env.local` exists
- Restart the dev server

**"API errors"**
- Verify all API keys are correct
- Check service credit balances
- Review API usage limits

**"Supabase errors"**
- Confirm database migration ran
- Check bucket permissions
- Verify RLS policies

## Next Development Steps

1. Create a video form component
2. Add authentication UI
3. Build project gallery
4. Implement status polling
5. Add error handling UI

## Resources

- 📖 [Full Setup Guide](SETUP.md)
- 📊 [Project Summary](PROJECT_SUMMARY.md)
- 📚 [README](README.md)

## Support

For detailed setup of each service, see [SETUP.md](SETUP.md).

For project architecture details, see [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md).

---

**Happy Building! 🚀**

