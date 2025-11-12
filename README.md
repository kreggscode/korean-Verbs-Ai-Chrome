# 🇰🇷 Korean Verbs AI - Chrome Extension

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Coming%20Soon-blue?style=for-the-badge)](https://github.com/kreggscode/korean-Verbs-Ai-Chrome)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge)](package.json)

> **Learn Korean Verbs Like Never Before** - An AI-powered Chrome extension that makes learning Korean verbs interactive, engaging, and fun! 🚀

## ✨ Features

### 📚 **Comprehensive Verb Database**
- **500+ Korean verbs** organized by categories (Daily, Food, Action, Emotion, etc.)
- **Detailed information** for each verb including:
  - Korean text (한글)
  - Romanization (로마자)
  - English meaning
  - Example sentences with translations
  - Audio pronunciation in native Korean

### 🤖 **AI-Powered Learning**
- **Intelligent Explanations** - Get creative, detailed explanations for any verb using Pollination AI
- **Smart Chat Interface** - Ask questions about Korean verbs, grammar, and culture
- **Temperature Set to 1** - Highly creative and engaging responses
- **Context-Aware** - AI understands the verb you're studying and provides relevant insights

### 🔊 **Native Pronunciation**
- **Real Korean Audio** - Hear authentic Korean pronunciation for verbs and example sentences
- **Web Speech API** - Built-in browser speech synthesis
- **Adjustable Speed** - Control pronunciation speed for better learning

### 👁️ **Vision Analysis**
- **Image Upload** - Upload any image to analyze
- **AI Image Analysis** - Get creative insights about images with Korean language context
- **Learning Integration** - Connect visual learning with Korean language concepts

### 💾 **Learning History**
- **Track Progress** - Automatically save all verbs you study
- **Time Stamps** - See when you learned each verb
- **Quick Review** - Revisit previously studied verbs
- **Up to 50 Items** - Keep your most recent learning sessions

### 🎨 **Beautiful UI/UX**
- **Neon Glow Aesthetic** - Modern, visually stunning design
- **Dark/Light Mode** - Toggle between themes for comfortable learning
- **Smooth Animations** - Delightful transitions and interactions
- **Responsive Design** - Perfect on any screen size
- **Fast Performance** - Optimized for speed and efficiency

## 🚀 Quick Start

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kreggscode/korean-Verbs-Ai-Chrome.git
   cd korean-Verbs-Ai-Chrome
   ```

2. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable **Developer Mode** (top right)
   - Click **Load unpacked**
   - Select the extension folder
   - Done! 🎉

3. **Generate Icons** (Optional)
   - Open `icon-generator.html` in your browser
   - Customize colors and style
   - Download all icon sizes
   - Place in `icons/` folder

### First Use

1. Click the extension icon in your Chrome toolbar
2. Browse categories or search for verbs
3. Click any verb to see details
4. Click "Pronounce" to hear the verb
5. Click "Get AI Explanation" for creative insights
6. Use the Chat tab to ask questions
7. Upload images in the Vision tab for analysis

## 📋 File Structure

```
korean-Verbs-Ai-Chrome/
├── manifest.json              # Extension configuration
├── popup.html                 # Main UI
├── popup.js                   # Core logic & AI integration
├── styles.css                 # Stunning design
├── background.js              # Service worker
├── korean_verbs.json          # Verb database (500+ verbs)
├── icon-generator.html        # Icon creation tool
├── README.md                  # This file
├── icons/                     # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   ├── icon-128.png
│   └── icon-256.png
└── docs/                      # Documentation
    ├── index.html             # Landing page
    ├── privacy.html           # Privacy policy
    └── terms.html             # Terms & conditions
```

## 🔧 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI**: Pollination AI (OpenAI Compatible)
- **APIs**: Chrome Storage API, Web Speech API, Fetch API
- **Design**: CSS Gradients, Animations, Neon Effects
- **Data**: JSON (500+ Korean verbs)

## 🎯 Core Features Explained

### 1. **Verb Categories**
Browse verbs organized by real-world categories:
- Daily Activities (가다, 오다, 먹다)
- Emotions (좋아하다, 싫어하다)
- Actions (하다, 일하다)
- And many more!

### 2. **AI Explanations**
Get creative explanations powered by Pollination AI:
- Verb meaning and usage
- Common conjugations
- Memory tips
- Related verbs
- Example usage

### 3. **Interactive Chat**
Ask your AI teacher anything:
- "How do I conjugate 가다?"
- "What's the difference between 오다 and 가다?"
- "Tell me about Korean grammar"
- "What are common verbs for cooking?"

### 4. **Vision Analysis**
Upload images and get Korean language insights:
- Analyze images with AI
- Connect visual learning to Korean
- Get creative interpretations
- Learn vocabulary from images

### 5. **Learning History**
Track your progress:
- See all verbs you've studied
- Timestamps for each study session
- Quick access to review
- Automatic cleanup (keeps 50 most recent)

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Accent**: Cyan (#06b6d4)
- **Success**: Green (#10b981)
- **Dark Mode**: Slate colors for comfortable viewing

### Animations
- Smooth fade-ins and slide-ins
- Hover effects with glow
- Sparkle effects on AI buttons
- Shimmer animation on header
- Responsive transitions

### Accessibility
- High contrast ratios
- Clear typography
- Keyboard navigation support
- Dark mode for eye comfort
- Readable font sizes

## 🔐 Privacy & Security

✅ **Privacy First**
- All data stored locally in Chrome Storage
- No external tracking
- No user data collection
- No analytics
- No third-party cookies

✅ **Permissions**
- `storage` - Save learning history
- `activeTab` - Detect current tab
- `https://text.pollinations.ai/*` - AI API calls
- `https://image.pollinations.ai/*` - Image analysis

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Brave
- ✅ Opera
- ✅ Chromium-based browsers

## 🚀 Deployment

### Chrome Web Store
Ready to publish! Follow these steps:

1. Create a [Chrome Web Store Developer Account](https://chrome.google.com/webstore/devconsole)
2. Upload the extension ZIP file
3. Fill in store listing details
4. Submit for review
5. Approved! 🎉

### GitHub Pages (Landing Page)
The `docs/` folder is ready for GitHub Pages:

1. Go to repository Settings
2. Enable GitHub Pages
3. Select `docs/` folder as source
4. Your landing page is live!

## 📚 Documentation

- **[Privacy Policy](docs/privacy.html)** - How we handle your data
- **[Terms & Conditions](docs/terms.html)** - Legal terms
- **[Landing Page](docs/index.html)** - Beautiful introduction

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Improve translations
- Add more verbs
- Enhance UI/UX

## 📧 Contact

- **Email**: kreg9da@gmail.com
- **GitHub**: [@kreggscode](https://github.com/kreggscode)
- **Repository**: [korean-Verbs-Ai-Chrome](https://github.com/kreggscode/korean-Verbs-Ai-Chrome)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pollination AI** - For powerful AI capabilities
- **Chrome Team** - For the amazing extension platform
- **Korean Language Community** - For inspiration and support
- **All Contributors** - For making this better

## 🎓 Learning Tips

1. **Start with Daily Verbs** - Begin with common verbs you use every day
2. **Use Pronunciation** - Listen to native speakers to improve accent
3. **Read Example Sentences** - Context helps memory retention
4. **Ask AI Questions** - Don't hesitate to ask for clarification
5. **Upload Images** - Visual learning enhances memory
6. **Review History** - Revisit verbs regularly for better retention
7. **Use Chat** - Practice conversations with your AI teacher

## 🌟 Future Enhancements

- [ ] Verb conjugation practice
- [ ] Flashcard system
- [ ] Spaced repetition algorithm
- [ ] Leaderboard & achievements
- [ ] Offline mode
- [ ] Mobile app version
- [ ] Community features
- [ ] Advanced grammar lessons

## 📊 Statistics

- **500+** Korean verbs
- **Multiple** categories
- **AI-Powered** explanations
- **Native** pronunciation
- **100%** Privacy-focused
- **0** Ads or tracking

---

**Made with ❤️ for Korean language learners worldwide**

Start learning Korean verbs today! 🇰🇷✨

[⬆ Back to Top](#-korean-verbs-ai---chrome-extension)
