# 🚀 Quick Start Guide - Korean Verbs AI v3.0

## Installation

### Step 1: Load Extension in Chrome
```
1. Open Chrome
2. Go to: chrome://extensions/
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked"
5. Select the extension folder
6. Extension appears with real icon in toolbar
```

### Step 2: Verify Installation
- ✅ Extension icon appears in Chrome toolbar
- ✅ Icon shows real image (not placeholder)
- ✅ Click icon to open popup

---

## Navigation Flow

### Page 1: Categories
```
Click extension icon
    ↓
See all verb categories (Daily, Travel, Business, etc.)
    ↓
Click any category
```

### Page 2: Verbs List
```
See all verbs in selected category
    ↓
Optional: Search for specific verb
    ↓
Click any verb to view details
    ↓
Back button returns to categories
```

### Page 3: Verb Detail
```
See complete verb information:
- Korean verb (with pronunciation button)
- English translation (with pronunciation button)
- Example sentence (with pronunciation button)
- AI explanation (with speak button)
    ↓
Use Previous/Next buttons to navigate between verbs
    ↓
Back button returns to verbs list
```

---

## Features to Test

### 1. Navigation ✅
- [ ] Click category → see verbs list
- [ ] Click verb → see verb detail
- [ ] Click back button → return to verbs list
- [ ] Click back button → return to categories
- [ ] Use Previous/Next buttons → navigate between verbs

### 2. Voice Features ✅
- [ ] Click "Pronounce (Korean)" → hear Korean with female voice
- [ ] Click "Pronounce (English)" → hear English with female voice
- [ ] Click "Pronounce Example" → hear example sentence
- [ ] Click "Get AI Explanation" → wait for response
- [ ] Click "Speak" → hear explanation read aloud
- [ ] Click "Stop" → stop speaking

### 3. Icons ✅
- [ ] Extension icon visible in toolbar
- [ ] Icon is real image (not placeholder)
- [ ] Icon displays correctly

### 4. Other Features ✅
- [ ] Chat tab → ask questions about Korean
- [ ] Vision tab → upload image for analysis
- [ ] History tab → see learning history
- [ ] Dark mode toggle → switch theme

---

## Voice Quality

### Expected Results
- **Korean Pronunciation**: Natural female voice, authentic Korean
- **English Pronunciation**: Natural female voice, clear English
- **AI Explanation**: Natural female voice, non-robotic, engaging
- **Speed**: 0.9x (natural, easy to understand)
- **Pitch**: 1.2 (female voice, pleasant to listen to)

### If Voice Sounds Robotic
- Check browser settings: Settings → Advanced → Accessibility
- Ensure system has text-to-speech enabled
- Try different browser (Chrome recommended)

---

## Troubleshooting

### Extension Won't Load
- [ ] Check folder path is correct
- [ ] Verify manifest.json exists
- [ ] Check browser console for errors (F12)
- [ ] Try reloading extension

### Icons Not Showing
- [ ] Verify icons folder exists with all 5 PNG files
- [ ] Check manifest.json has correct icon paths
- [ ] Reload extension (click reload button)
- [ ] Clear Chrome cache (Settings → Clear browsing data)

### Voice Not Working
- [ ] Check system volume is on
- [ ] Verify text-to-speech is enabled in Chrome
- [ ] Try different language (Korean vs English)
- [ ] Restart Chrome browser

### AI Explanation Not Loading
- [ ] Check internet connection
- [ ] Verify Pollination AI is accessible
- [ ] Wait 2-3 seconds for response
- [ ] Check browser console for errors (F12)

---

## Tips for Best Experience

### 1. Use Chrome Browser
- Best compatibility with Web Speech API
- Smoothest performance
- Best voice quality

### 2. Enable Notifications
- Settings → Extensions → Korean Verbs AI
- Allow notifications for learning reminders

### 3. Use Dark Mode
- Click moon icon in header
- Easier on eyes for extended learning

### 4. Check Learning History
- Click History tab
- See all verbs you've studied
- Track your progress

### 5. Use Chat Feature
- Ask questions about Korean grammar
- Get personalized explanations
- Learn from AI teacher

---

## File Structure

```
korean-Verbs-Ai-Chrome/
├── manifest.json          ← Extension configuration
├── popup.html             ← Main UI (3 pages)
├── popup.js               ← Navigation & logic
├── styles.css             ← Styling
├── background.js          ← Service worker
├── korean_verbs.json      ← 500+ verbs database
├── icons/                 ← Real extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   ├── icon-128.png
│   └── icon-256.png
└── docs/                  ← Landing page & docs
    ├── index.html
    ├── privacy.html
    └── terms.html
```

---

## Key Features

### Multi-Page Navigation
- Categories → Verbs → Details
- Back buttons on every page
- Smooth transitions
- Clean organization

### Natural Voice
- Female voice for all TTS
- Korean & English support
- Non-robotic pronunciation
- Natural speaking rate

### Real Icons
- 5 different sizes (16-256px)
- Professional appearance
- No placeholders
- Displays in Chrome toolbar

### AI-Powered
- Pollination AI integration
- Creative explanations (temperature: 1)
- Fast responses (~2-3 seconds)
- Engaging content

### Privacy First
- All data stored locally
- No tracking or analytics
- No personal data collection
- HTTPS only for API calls

---

## Support

### Documentation
- README.md - Full documentation
- SETUP_GUIDE.md - Installation guide
- DEPLOYMENT.md - Chrome Web Store guide
- FINAL_UPDATE.md - v3.0 changes

### GitHub
- Repository: https://github.com/kreggscode/korean-Verbs-Ai-Chrome.git
- Issues: Report bugs on GitHub
- Email: kreg9da@gmail.com

---

## Next Steps

1. ✅ Load extension in Chrome
2. ✅ Test all navigation pages
3. ✅ Test voice features
4. ✅ Verify icons display
5. ✅ Try all tabs (Chat, Vision, History)
6. ✅ Test dark mode
7. ✅ Ready for Chrome Web Store!

---

**Version**: 3.0 - FINAL
**Status**: ✅ Production Ready
**Last Updated**: November 12, 2025
