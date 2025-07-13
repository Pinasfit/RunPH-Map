# Philippine Map Website Wireframes

## 1. Homepage Layout

### Header Section
```
[Logo: Philippine Map Runner] [Home] [Athletes] [Provinces] [About] [Login/Register]
```

### Main Content Area
```
+----------------------------------------------------------+
|                    HERO SECTION                         |
|  "Discover the Philippines Through Running Athletes"    |
|              [Explore Map Button]                       |
+----------------------------------------------------------+
|                                                          |
|                 INTERACTIVE MAP                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |    [Philippine SVG Map with Province Boundaries]  |  |
|  |                                                    |  |
|  |    • Green provinces = Available for advertising  |  |
|  |    • Yellow provinces = Partially sponsored       |  |
|  |    • Red provinces = Fully purchased              |  |
|  |    • Small circular profile pics on provinces     |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

### Sidebar (Right)
```
+------------------------+
| PROVINCE STATS         |
|                        |
| Available: 45          |
| Sponsored: 25          |
| Athletes: 1,247        |
|                        |
| FEATURED ATHLETES      |
| [Profile Pic] Name     |
| [Profile Pic] Name     |
| [Profile Pic] Name     |
|                        |
| RECENT PURCHASES       |
| • Metro Manila - $500  |
| • Cebu - $300         |
| • Davao - $250        |
+------------------------+
```

## 2. Province Detail Modal

When clicking on a province:
```
+----------------------------------------------------------+
|  [X]                PROVINCE NAME                        |
+----------------------------------------------------------+
|                                                          |
|  [Province Image]     PROVINCE INFORMATION              |
|                       Population: XXX                   |
|                       Capital: XXX                      |
|                       Region: XXX                       |
|                                                          |
|  ADVERTISING OPTIONS                                     |
|  ○ Basic Package - $100/month                          |
|  ○ Premium Package - $250/month                        |
|  ○ Exclusive Package - $500/month                      |
|                                                          |
|  ATHLETES FROM THIS PROVINCE (12)                       |
|  [Profile Grid with 4x3 layout]                        |
|                                                          |
|  [Purchase Advertising] [View All Athletes]             |
+----------------------------------------------------------+
```

## 3. Athlete Profile Page

```
+----------------------------------------------------------+
|                    ATHLETE HEADER                       |
|  [Large Profile Photo]  [Athlete Name]                 |
|                         Age: XX | Province: XXX         |
|                         Running Since: XXXX            |
+----------------------------------------------------------+
|                                                          |
|  ACHIEVEMENTS           |  RECENT RACES                 |
|  • Marathon PR: X:XX    |  • Race Name - Date           |
|  • 10K PR: XX:XX       |  • Race Name - Date           |
|  • Half Marathon: X:XX  |  • Race Name - Date           |
|                         |                               |
|  STATISTICS             |  TRAINING LOG                 |
|  Total Distance: XXXkm  |  [Weekly training chart]     |
|  Races Completed: XX    |                               |
|  Average Pace: X:XX     |                               |
|                                                          |
|  SOCIAL MEDIA                                           |
|  [Instagram] [Facebook] [Strava]                       |
+----------------------------------------------------------+
```

## 4. Athlete Registration Form

```
+----------------------------------------------------------+
|                 CREATE ATHLETE PROFILE                   |
+----------------------------------------------------------+
|                                                          |
|  PERSONAL INFORMATION                                   |
|  First Name: [_____________]                            |
|  Last Name:  [_____________]                            |
|  Age:        [___]                                      |
|  Email:      [_____________]                            |
|  Phone:      [_____________]                            |
|                                                          |
|  LOCATION                                               |
|  Choose Your Province: [Dropdown Menu ▼]               |
|                                                          |
|  PROFILE PHOTO                                          |
|  [Upload Photo Button] [Preview Area]                  |
|                                                          |
|  RUNNING INFORMATION                                    |
|  Years Running:     [___]                               |
|  Favorite Distance: [Dropdown ▼]                       |
|  Personal Records:                                      |
|    5K:  [__:__]                                        |
|    10K: [__:__]                                        |
|    Half Marathon: [_:__:__]                            |
|    Marathon: [_:__:__]                                 |
|                                                          |
|  BIO                                                    |
|  [Text Area for athlete bio]                           |
|                                                          |
|  [Create Profile] [Cancel]                             |
+----------------------------------------------------------+
```

## 5. Mobile Layout (Responsive)

### Mobile Homepage
```
+------------------+
| [☰] Logo [Login] |
+------------------+
|                  |
|   HERO SECTION   |
|                  |
+------------------+
|                  |
|                  |
|   MOBILE MAP     |
|   (Vertical)     |
|                  |
|                  |
+------------------+
| QUICK STATS      |
| Athletes: 1,247  |
| Provinces: 82    |
+------------------+
| FEATURED         |
| [Profile] Name   |
| [Profile] Name   |
+------------------+
```

## 6. Interactive Elements

### Province Hover State
- Subtle glow effect around province boundary
- Tooltip showing:
  - Province name
  - Number of athletes
  - Advertising availability
  - Starting price

### Athlete Profile Pictures on Map
- Circular profile pictures (30px diameter on desktop, 20px on mobile)
- When multiple athletes in same province:
  - Stack with slight offset
  - Show count badge (e.g., "+5")
  - Click to expand grid view

### Map Zoom and Pan
- Mouse wheel zoom
- Click and drag to pan
- Reset zoom button
- Mobile: Pinch to zoom, touch to pan

## 7. Color Coding System

### Province States
- **Available (Green)**: #10B981 - Ready for advertising purchase
- **Partially Sponsored (Yellow)**: #F59E0B - Some advertising slots taken
- **Fully Purchased (Red)**: #EF4444 - All advertising slots occupied
- **Premium (Blue)**: #3B82F6 - High-value provinces (Metro Manila, Cebu, Davao)

### Interactive States
- **Hover**: Lighten color by 20%
- **Active/Selected**: Add white border (2px)
- **Loading**: Subtle pulse animation

This wireframe structure provides a comprehensive foundation for implementing the interactive Philippine map website with integrated athlete profiles and advertising functionality.

