# Bestate - Database Setup Guide

## Supabase Configuration

This project uses Supabase for:
- User Authentication (Sign Up/Sign In)
- User Profiles Storage
- Favorites Management
- Real-time Updates

## Database Schema

### Tables to Create

#### 1. User Profiles Table
```sql
CREATE TABLE IF NOT EXISTS app_13f02_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE app_13f02_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile" ON app_13f02_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON app_13f02_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON app_13f02_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

#### 2. Favorites Table
```sql
CREATE TABLE IF NOT EXISTS app_13f02_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  property_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, property_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS favorites_user_idx ON app_13f02_favorites(user_id);
CREATE INDEX IF NOT EXISTS favorites_property_idx ON app_13f02_favorites(property_id);

-- Enable RLS
ALTER TABLE app_13f02_favorites ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own favorites" ON app_13f02_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites" ON app_13f02_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorites" ON app_13f02_favorites
  FOR DELETE USING (auth.uid() = user_id);
```

## Setup Steps

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free account
   - Create a new project

2. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy your `Project URL`
   - Copy your `anon/public` API key

3. **Run SQL Commands**
   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the SQL commands above
   - Execute them to create tables

4. **Configure Platform**
   - Click the Supabase button on top-right of MGX platform
   - Enter your Project URL and API Key
   - Save configuration

## Environment Variables (For Local Development)

Create a `.env` file:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Features Enabled

✅ User Registration with Email/Password
✅ User Login with Session Management
✅ Secure Password Storage (handled by Supabase)
✅ User Profiles
✅ Favorites Management
✅ Real-time Data Sync
✅ Row Level Security (RLS)

## Notes

- All user passwords are securely hashed by Supabase
- RLS policies ensure users can only access their own data
- The `auth.users` table is managed automatically by Supabase
- No need to create user tables manually