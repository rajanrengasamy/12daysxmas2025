# Doors JSON Schema Documentation

This document describes the structure and usage of the `doors.json` file for the 12 Days of Christmas Memory App.

## Overview

The `doors.json` file contains all the data for the 12 memory doors in the advent calendar-style Christmas memory application.

---

## JSON Schema

### Root Structure

```json
{
  "doors": [...],
  "metadata": {...}
}
```

### Door Object Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `number` | integer | Yes | Door number (1-12) |
| `title` | string | Yes | Display title for the memory |
| `imageUrl` | string | Yes | Path to the memory photo |
| `backgroundScene` | string | Yes | Background scene identifier |
| `poem` | string | Yes | Multi-line poem text |
| `caption` | string | Yes | Photo caption with location/date |
| `audioTrack` | string | Yes | Audio track identifier |
| `isOpened` | boolean | Yes | Whether the door has been opened |
| `theme` | string | Yes | Thematic tag for the memory |

### Metadata Object Schema

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Schema version number |
| `lastUpdated` | string | ISO date of last update |
| `totalDoors` | integer | Total number of doors |
| `backgroundScenes` | array | Available background scenes |
| `audioTracks` | array | Available audio tracks |

---

## Available Options

### Background Scenes

| Value | Description |
|-------|-------------|
| `cabin` | Cozy cabin interior with warm fireplace glow |
| `forest` | Snowy forest with gentle falling snow |
| `market` | Christmas market with twinkling lights |
| `fireside` | Close-up fireside with crackling flames |

### Audio Tracks

| Value | Description |
|-------|-------------|
| `jingle-soft` | Soft, gentle jingle bells melody |
| `bells-gentle` | Light bell chimes and winter ambiance |
| `winter-wonder` | Orchestral winter wonderland theme |

### Themes

1. `friendship` - Bonds with friends
2. `love` - Romantic or familial love
3. `time together` - Quality time and presence
4. `holidays` - Holiday celebrations
5. `gratitude` - Thankfulness
6. `family` - Family connections
7. `life's journey` - Life experiences and growth
8. `meaning of life` - Deeper reflections
9. `laughter` - Joy and humor
10. `adventure` - Exploration and travel
11. `support` - Being there for each other
12. `hope` - Optimism for the future

---

## Customization Guide

### Updating Content

1. **Replace placeholder images:** Update each `imageUrl` with your actual photo paths
2. **Personalize poems:** Reference `poems.md` for full poem texts or write custom ones
3. **Update captions:** Add real locations and dates
4. **Modify titles:** Make titles specific to your memories

---

## Image Optimization Requirements

| Property | Recommendation |
|----------|----------------|
| **Format** | WebP (preferred), JPEG (fallback) |
| **Dimensions** | 1200 x 800px (3:2 aspect ratio) |
| **File size** | Under 200KB per image |
| **Color space** | sRGB |

### Directory Structure

```
/public
  /photos
    memory-1.jpg
    memory-1.webp
    memory-2.jpg
    ...
```

---

## Audio File Format Recommendations

| Property | Recommendation |
|----------|----------------|
| **Format** | MP3 (primary), OGG (fallback) |
| **Bitrate** | 128-192 kbps |
| **Duration** | 2-4 minutes (loopable) |
| **File size** | Under 3MB per track |

### Directory Structure

```
/public
  /audio
    jingle-soft.mp3
    bells-gentle.mp3
    winter-wonder.mp3
```

---

## Validation Checklist

- [ ] All 12 doors have unique numbers (1-12)
- [ ] All required fields are present
- [ ] `isOpened` is boolean (not string)
- [ ] Image paths are correctly formatted
- [ ] Background scenes match available options
- [ ] Audio tracks match available options

### Testing

```bash
# Validate JSON syntax
npx jsonlint doors.json

# Or using Node.js
node -e "require('./doors.json')"
```

---

## Related Files

- `poems.md` - Full poem texts
- `art-prompts.md` - Gemini image generation prompts
- `lovable-prompt.md` - Lovable build instructions
