# Bestate Real Estate Platform - Enhancement Plan

## Design Guidelines

### Visual Updates
- **Logo**: Enlarge Bestate logo, convert to PNG without background grid, make name more prominent
- **Dark Mode**: Add dark mode toggle in user settings with system preference detection
- **Layout**: Minimal left sidebar for filters, main content area for property grid

### Color Palette (Dark Mode Support)
- Light Mode:
  - Primary: #2563EB (Blue)
  - Background: #FFFFFF
  - Card: #F9FAFB
  - Text: #111827
- Dark Mode:
  - Primary: #3B82F6 (Lighter Blue)
  - Background: #0F172A
  - Card: #1E293B
  - Text: #F1F5F9

## Development Tasks

### 1. Property Detail Page ✅
- Multi-image gallery with thumbnails
- Complete property specifications
- Seller information card
- Contact seller form
- Related properties section
- Breadcrumb navigation

### 2. Enhanced Properties Page ✅
- Minimal left sidebar with filters
- Property grid layout on right
- Responsive design (sidebar collapses on mobile)
- Filter chips showing active filters

### 3. User Profile Page ✅
- Profile information display (name, email, location, phone, bio)
- Edit profile functionality
- My Properties section with add/edit/delete
- Settings section:
  - Update password
  - Update personal information
  - Dark mode toggle
- Property management (add new property form)

### 4. Logo Enhancement ✅
- Create new PNG logo without grid background
- Enlarge logo size
- Make "Bestate" text more prominent
- Update all logo references

## Files to Create/Update

### New Files:
1. `src/pages/PropertyDetail.tsx` - Detailed property view
2. `src/pages/Profile.tsx` - User profile and settings
3. `src/components/ImageGallery.tsx` - Property image gallery
4. `src/components/ContactSellerForm.tsx` - Contact form component
5. `src/components/PropertyForm.tsx` - Add/edit property form
6. `src/contexts/ThemeContext.tsx` - Dark mode context
7. `src/hooks/useTheme.ts` - Dark mode hook
8. `public/assets/logo-bestate.png` - New logo

### Updated Files:
1. `src/pages/Properties.tsx` - Redesign with sidebar filters
2. `src/components/Navbar.tsx` - Update logo and add profile link
3. `src/App.tsx` - Add new routes
4. `src/index.css` - Add dark mode styles
5. `index.html` - Update title and meta tags

## Database Schema Updates

### New Tables:
```sql
-- Properties table (user-generated listings)
CREATE TABLE app_2ea33eecc0_properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10,2),
  images TEXT[], -- Array of image URLs
  features TEXT[], -- Array of features
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table (contact seller)
CREATE TABLE app_2ea33eecc0_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES app_2ea33eecc0_properties,
  sender_id UUID REFERENCES auth.users,
  recipient_id UUID REFERENCES auth.users NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles extension
ALTER TABLE app_2ea33eecc0_profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE app_2ea33eecc0_profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE app_2ea33eecc0_profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE app_2ea33eecc0_profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

## Implementation Order

1. ✅ Generate new logo
2. ✅ Create dark mode context and theme system
3. ✅ Update database schema
4. ✅ Build Property Detail Page
5. ✅ Redesign Properties Page with sidebar
6. ✅ Create User Profile Page
7. ✅ Update Navbar with new logo and profile link
8. ✅ Test all features
9. ✅ Final lint and build check