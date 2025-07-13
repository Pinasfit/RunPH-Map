# Philippine Map Website Design Concept

## Project Overview
A Next.js-powered interactive website featuring a clickable map of the Philippines where each province can be purchased for advertising space, inspired by the Million Dollar Homepage concept. The site will also include user profiles for runner athletes.

## Core Concept: Million Dollar Homepage Adaptation

### Original Million Dollar Homepage
- Created by Alex Tew in 2005
- 1,000,000 pixels arranged in a 1000×1000 grid
- Each pixel sold for $1
- Advertisers could buy blocks of pixels (minimum 10×10 = 100 pixels)
- Clicking on a block would redirect to the advertiser's website

### Philippine Provinces Adaptation
- Instead of pixels, each of the 82 provinces can be "purchased" for advertising
- Each province becomes a clickable advertising space
- Different pricing tiers based on province size, population, or economic importance
- Visual representation through the interactive SVG map
- Hover effects and animations to enhance user experience

## Target Audience
1. **Advertisers/Businesses**: Companies wanting to advertise to specific regional audiences
2. **Runner Athletes**: Athletes who want to create profiles and showcase their achievements
3. **General Public**: Visitors interested in exploring Philippine provinces and discovering businesses

## Visual Design Direction

### Color Palette
- **Primary**: Deep Blue (#1E40AF) - representing the Philippine seas
- **Secondary**: Golden Yellow (#F59E0B) - representing the sun from the flag
- **Accent**: Crimson Red (#DC2626) - representing the flag's red stripe
- **Neutral**: Warm Gray (#6B7280) for text and backgrounds
- **Success**: Emerald Green (#10B981) for available provinces
- **Warning**: Amber (#F59E0B) for partially sold provinces
- **Sold**: Red (#EF4444) for fully purchased provinces

### Typography
- **Headings**: Poppins (modern, clean, professional)
- **Body Text**: Inter (highly readable, web-optimized)
- **Accent/Logo**: Montserrat (bold, distinctive)

### Visual Style
- **Modern Minimalist**: Clean lines, ample whitespace
- **Interactive Elements**: Smooth hover effects, subtle animations
- **Professional**: Business-friendly while remaining approachable
- **Mobile-First**: Responsive design for all devices

## Key Features & User Interface

### 1. Interactive Map Interface
- **Central Map**: Large, prominent SVG map of the Philippines
- **Province Hover Effects**: 
  - Subtle glow/highlight on hover
  - Tooltip showing province name, availability status, and athlete count
  - Price information display
- **Color Coding**:
  - Green: Available for purchase
  - Yellow: Partially sponsored
  - Red: Fully purchased
  - Blue: Premium provinces (higher pricing)
- **Athlete Profile Integration**:
  - Small circular profile pictures displayed on each province
  - Profile pictures scale based on province size
  - Hover over profile pictures shows athlete name and achievements
  - Click on profile pictures opens athlete's full profile
  - Multiple athletes per province shown in organized clusters

### 2. Province Purchase System
- **Click to Purchase**: Modal popup with province details
- **Pricing Tiers**:
  - Tier 1 (Metro Manila, Cebu, Davao): Premium pricing
  - Tier 2 (Major provinces): Standard pricing
  - Tier 3 (Smaller provinces): Basic pricing
- **Purchase Options**:
  - Duration-based (1 month, 6 months, 1 year)
  - Exclusive vs. shared advertising space
  - Custom banner/logo upload
  - Link destination URL

### 3. Runner Athlete Profiles
- **Profile Creation**: Registration form with athlete details
- **Profile Features**:
  - Personal information and photo
  - Running achievements and records
  - Race history and upcoming events
  - Training logs and statistics
  - Social media integration
- **Province Connection**: Athletes can choose their province and their profile picture will be displayed on that province on the map
- **Visual Map Integration**: Small circular profile pictures appear as overlays on the selected province
- **Multiple Athletes per Province**: When multiple athletes choose the same province, profile pictures are arranged in a grid or carousel
- **Leaderboards**: Rankings by province, age group, distance

### 4. Navigation & Layout
- **Header**: Logo, main navigation, user account access
- **Main Content**: Interactive map takes center stage
- **Sidebar**: Quick stats, featured provinces, recent purchases
- **Footer**: Links, contact information, social media

## Technical Specifications

### Frontend Framework
- **Next.js 14**: React-based framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### Interactive Map
- **SVG Manipulation**: Direct SVG editing for province interactions
- **React State Management**: Track province availability and user interactions
- **Animation Library**: Framer Motion for smooth transitions

### Backend Requirements
- **Database**: PostgreSQL for user profiles and purchase records
- **Authentication**: NextAuth.js for user management
- **Payment Processing**: Stripe integration for province purchases
- **File Upload**: Cloudinary for athlete photos and advertiser assets

### Responsive Design
- **Desktop**: Full map view with detailed sidebars
- **Tablet**: Optimized map size with collapsible panels
- **Mobile**: Vertical layout with touch-friendly interactions

## User Experience Flow

### For Advertisers
1. Browse interactive map
2. Click on desired province
3. View pricing and availability
4. Create account or login
5. Complete purchase with payment
6. Upload advertising materials
7. Monitor performance analytics

### For Athletes
1. Register for athlete account
2. Complete profile with running data
3. Select home province association
4. Browse other athletes by province
5. Update achievements and records
6. Participate in province-based competitions

### For General Visitors
1. Explore interactive map
2. Discover businesses by province
3. Learn about different regions
4. View athlete profiles and achievements
5. Access running events and news

## Monetization Strategy
- **Province Advertising**: Primary revenue from businesses purchasing province spaces
- **Premium Features**: Enhanced athlete profiles with additional features
- **Event Partnerships**: Sponsored running events and competitions
- **Affiliate Marketing**: Commission from partner businesses

## Success Metrics
- **Revenue**: Total province purchases and subscription fees
- **Engagement**: Time spent on site, map interactions
- **User Growth**: New athlete registrations and advertiser signups
- **Retention**: Repeat purchases and active user sessions

This design concept provides a comprehensive foundation for creating an engaging, profitable, and user-friendly Philippine map website that successfully combines the Million Dollar Homepage concept with athlete community features.

