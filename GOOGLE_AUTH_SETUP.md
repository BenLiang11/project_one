# Google OAuth Setup Guide for Clip Pilot

Follow these steps to enable Google Sign-In for your Clip Pilot application.

## Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project** (or select existing)
   - Click "Select a project" at the top
   - Click "New Project"
   - Name it "Clip Pilot" (or your preferred name)
   - Click "Create"

3. **Enable Google+ API**
   - In the left sidebar, go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click on it and click "Enable"

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Select "External" user type
   - Click "Create"
   - Fill in the required fields:
     - App name: **Clip Pilot**
     - User support email: Your email
     - Developer contact email: Your email
   - Click "Save and Continue"
   - Skip "Scopes" (click "Save and Continue")
   - Add test users if needed
   - Click "Save and Continue"

5. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Name: **Clip Pilot Web Client**
   - Add Authorized JavaScript origins:
     - For local development: `http://localhost:3000`
     - For production: `https://yourdomain.com`
   - Add Authorized redirect URIs:
     - For local: `http://localhost:3000/auth/callback`
     - For Supabase callback: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
   - Click "Create"
   - **Save the Client ID and Client Secret**

## Step 2: Configure Supabase

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard

2. **Navigate to Authentication Settings**
   - Select your project
   - Go to "Authentication" → "Providers"
   - Find "Google" in the list

3. **Enable Google Provider**
   - Toggle "Enable Google" to ON
   - Enter your **Client ID** from Google Console
   - Enter your **Client Secret** from Google Console
   - Click "Save"

4. **Get Your Callback URL**
   - Copy the callback URL shown in Supabase
   - It looks like: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
   - Make sure this is added to Google Console (see Step 1.5 above)

## Step 3: Update Your Application

Your application is already configured to use Google OAuth! The code is ready in:
- `/app/login/page.tsx` - Login with Google button
- `/app/signup/page.tsx` - Sign up with Google button
- `/app/auth/callback/route.ts` - Handles OAuth callback

## Step 4: Test the Integration

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Navigate to the login page**
   - Go to: http://localhost:3000/login

3. **Click "Continue with Google"**
   - You should be redirected to Google sign-in
   - After signing in, you'll be redirected back to your app
   - You should land on the dashboard page

## Important Notes

### For Production Deployment

When deploying to production:

1. **Update Google OAuth Credentials**
   - Add your production domain to "Authorized JavaScript origins"
   - Add your production callback URL to "Authorized redirect URIs"

2. **Update Supabase Redirect URLs**
   - Go to Supabase → Authentication → URL Configuration
   - Add your production URL to "Site URL"
   - Add redirect URLs if needed

3. **Verify OAuth Consent Screen**
   - Ensure your OAuth consent screen is published
   - Add necessary scopes (email, profile are auto-included)

### Troubleshooting

**Error: redirect_uri_mismatch**
- Make sure the callback URL in Google Console matches exactly
- Format: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`

**Error: invalid_client**
- Double-check your Client ID and Client Secret in Supabase
- Make sure there are no extra spaces

**Users not being created**
- Check Supabase Auth logs in Dashboard → Authentication → Logs
- Verify RLS policies allow user creation

**Google button not working**
- Check browser console for errors
- Verify Supabase URL and keys in `.env.local`

## Additional Security (Optional)

### Email Verification
- Go to Supabase → Authentication → Settings
- Enable "Confirm email" if you want email verification

### Redirect URLs Whitelist
- Go to Supabase → Authentication → URL Configuration
- Add allowed redirect URLs for additional security

## Testing Checklist

- [ ] Google OAuth credentials created
- [ ] Supabase Google provider configured
- [ ] Callback URL added to Google Console
- [ ] Environment variables set in `.env.local`
- [ ] Test login with Google on localhost
- [ ] Test signup with Google on localhost
- [ ] Verify user appears in Supabase Auth dashboard
- [ ] Test logout functionality

## Resources

- [Supabase Google OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Auth with Supabase](https://supabase.com/docs/guides/auth/server-side/nextjs)

