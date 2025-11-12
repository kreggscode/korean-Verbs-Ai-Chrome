# 🚀 Korean Verbs AI - Setup Guide

## Quick Start (5 minutes)

### Step 1: Clone the Repository
```bash
git clone https://github.com/kreggscode/korean-Verbs-Ai-Chrome.git
cd korean-Verbs-Ai-Chrome
```

### Step 2: Load in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in top right corner)
3. Click **Load unpacked**
4. Select the `korean-Verbs-Ai-Chrome` folder
5. The extension should now appear in your extensions list!

### Step 3: Test the Extension
1. Click the extension icon in your Chrome toolbar
2. Browse Korean verbs by category
3. Click a verb to see details
4. Try the "Pronounce" button
5. Get an AI explanation
6. Chat with the AI teacher

## 🎨 Generate Icons (Optional)

If you want to customize the extension icons:

1. Open `icon-generator.html` in your browser
2. Customize colors and style
3. Click "Download All Icons"
4. Create an `icons/` folder in the extension directory
5. Place the downloaded icons in the `icons/` folder
6. Reload the extension in Chrome

## 📱 Deploy Landing Page (GitHub Pages)

To make your landing page live:

1. Go to your GitHub repository settings
2. Scroll to "GitHub Pages" section
3. Select "Deploy from a branch"
4. Choose `main` branch and `/docs` folder
5. Click Save
6. Your landing page will be live at: `https://kreggscode.github.io/korean-Verbs-Ai-Chrome/`

## 🔧 Troubleshooting

### Extension not loading?
- Make sure you're in the correct directory
- Check that all files are present (manifest.json, popup.html, etc.)
- Try clicking "Refresh" on the extension card

### AI features not working?
- Check your internet connection
- Verify Pollination AI API is accessible
- Check browser console for errors (F12 → Console)

### Pronunciation not working?
- Ensure your browser supports Web Speech API
- Check volume settings
- Try a different browser (Chrome, Edge, Brave)

## 📦 Publishing to Chrome Web Store

When ready to publish:

1. Create a Chrome Web Store Developer account
2. Pay the $5 registration fee
3. Upload the extension ZIP file
4. Fill in store listing details
5. Submit for review (usually 1-3 days)
6. Once approved, it's live!

### Prepare for Store:
- Create a 128x128 icon (use icon-generator.html)
- Write compelling description
- Add screenshots (optional but recommended)
- Ensure privacy policy is accessible

## 🔐 Privacy & Security

The extension:
- ✅ Stores all data locally
- ✅ Uses HTTPS for API calls
- ✅ Requires minimal permissions
- ✅ Complies with Chrome Web Store policies
- ✅ Complies with GDPR/CCPA

## 📚 File Reference

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration |
| `popup.html` | Main UI structure |
| `popup.js` | Core logic and AI integration |
| `styles.css` | Beautiful styling |
| `background.js` | Service worker |
| `korean_verbs.json` | Verb database |
| `icon-generator.html` | Icon creation tool |
| `README.md` | Main documentation |
| `docs/` | Landing page and legal docs |

## 🎯 Next Steps

1. ✅ Load in Chrome
2. ✅ Test all features
3. ✅ Generate custom icons
4. ✅ Deploy landing page
5. ✅ Submit to Chrome Web Store (optional)

## 💡 Tips

- **Learning**: Start with "Daily" category verbs
- **Pronunciation**: Listen multiple times to improve accent
- **AI**: Ask specific questions for better explanations
- **Images**: Use vision feature to connect visual learning
- **History**: Review previously studied verbs regularly

## 📞 Support

- **Email**: kreg9da@gmail.com
- **GitHub Issues**: Report bugs on GitHub
- **Discussions**: Ask questions on GitHub Discussions

## 🎓 Learning Resources

- [Korean Language Basics](https://www.koreanclass101.com/)
- [Pollination AI Docs](https://pollinations.ai/)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)

---

**Happy Learning! 🇰🇷✨**

For more information, see [README.md](README.md)
