# Setup Guide for AI Video Generator

This guide will walk you through setting up all the required services and API keys for the AI Video Generator.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "Start your project" and sign up

2. **Create a New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name, database password, and region
   - Click "Create new project"

3. **Get Your API Keys**
   - Navigate to Settings → API
   - Copy the `Project URL` (starts with https://xxx.supabase.co)
   - Copy the `anon/public` key
   - Copy the `service_role` key (⚠️ Keep this secret!)

4. **Run Database Migration**
   - Go to SQL Editor in your Supabase dashboard
   - Click "New query"
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run the query

5. **Verify Storage Bucket**
   - Go to Storage in Supabase dashboard
   - Confirm `video-assets` bucket exists and is public

## Step 3: Set Up OpenAI

1. **Create OpenAI Account**
   - Go to [https://platform.openai.com](https://platform.openai.com)
   - Sign up or log in

2. **Add Billing**
   - Go to Settings → Billing
   - Add a payment method
   - Add credits (minimum $5 recommended)

3. **Create API Key**
   - Go to API keys section
   - Click "Create new secret key"
   - Copy the key (you won't see it again!)

## Step 4: Set Up Leonardo AI

1. **Create Leonardo Account**
   - Go to [https://leonardo.ai](https://leonardo.ai)
   - Sign up for an account

2. **Get API Access**
   - Navigate to your account settings
   - Find the API section
   - Generate an API key

3. **Check Credits**
   - Leonardo AI requires credits for image generation
   - Free tier provides limited credits
   - Consider upgrading for production use

## Step 5: Set Up ElevenLabs

1. **Create ElevenLabs Account**
   - Go to [https://elevenlabs.io](https://elevenlabs.io)
   - Sign up for an account

2. **Get API Key**
   - Go to Profile Settings
   - Find the API Key section
   - Copy your API key

3. **Choose Voice**
   - Browse available voices in the Voice Library
   - Copy the voice ID of your preferred voice
   - Update `lib/api/elevenlabs.ts` if you want a different default voice

## Step 6: Set Up Creatomate

1. **Create Creatomate Account**
   - Go to [https://creatomate.com](https://creatomate.com)
   - Sign up for an account

2. **Get API Key**
   - Navigate to Settings
   - Find API Keys section
   - Create and copy your API key

3. **Check Limits**
   - Review your plan limits for video rendering
   - Free tier has monthly limits
   - Upgrade if needed for production

## Step 7: Configure Environment Variables

1. **Copy the example file**
   ```bash
   # The .env.local file should already exist
   # If not, create it from the README template
   ```

2. **Fill in all the values in `.env.local`**:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # OpenAI
   OPENAI_API_KEY=sk-...

   # Leonardo AI
   LEONARDO_API_KEY=your-leonardo-key

   # ElevenLabs
   ELEVENLABS_API_KEY=your-elevenlabs-key

   # Creatomate
   CREATOMATE_API_KEY=your-creatomate-key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Step 8: Test the Setup

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

3. **Check for errors**
   - Open browser DevTools (F12)
   - Check Console for any errors
   - Verify all environment variables are loaded

## Troubleshooting

### Supabase Connection Issues
- Verify your URL and keys are correct
- Check if the database migration ran successfully
- Ensure the storage bucket is public

### OpenAI API Errors
- Verify you have credits in your account
- Check if your API key is valid
- Ensure you're using a supported model

### Leonardo AI Timeout
- Leonardo can be slow during peak times
- Increase timeout in `lib/api/leonardo.ts` if needed
- Check your credit balance

### ElevenLabs Issues
- Verify your API key is active
- Check if you have enough characters remaining
- Ensure the voice ID is valid

### Creatomate Rendering Fails
- Check your monthly render limit
- Verify API key permissions
- Check Creatomate dashboard for error logs

## Next Steps

Once everything is set up:

1. Test the video generation flow
2. Customize the UI components
3. Add authentication pages
4. Deploy to production

## Cost Estimates (Approximate)

- **OpenAI**: ~$0.10-0.30 per video (GPT-4)
- **Leonardo AI**: ~$0.05-0.15 per video (3 images)
- **ElevenLabs**: ~$0.05-0.10 per video (voiceover)
- **Creatomate**: ~$0.10-0.20 per video (rendering)
- **Supabase**: Free tier sufficient for testing

**Total per video**: ~$0.30-0.75 (varies based on usage)

## Support

For issues with specific services:
- Supabase: [docs.supabase.com](https://docs.supabase.com)
- OpenAI: [platform.openai.com/docs](https://platform.openai.com/docs)
- Leonardo: [docs.leonardo.ai](https://docs.leonardo.ai)
- ElevenLabs: [docs.elevenlabs.io](https://docs.elevenlabs.io)
- Creatomate: [docs.creatomate.com](https://docs.creatomate.com)

