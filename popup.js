// ===== Global Variables =====
let koreanVerbs = [];
let currentCategory = null;
let currentVerb = null;
let currentVerbIndex = 0;
let currentCategoryVerbs = [];
let chatHistory = [];
let learningHistory = [];
let currentSpeechUtterance = null;

const POLLINATION_API = 'https://text.pollinations.ai/openai';
const TEMPERATURE = 1; // Creative responses

// ===== DOM Elements =====
const container = document.querySelector('.container');
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const categoriesGrid = document.getElementById('categoriesGrid');
const verbsList = document.getElementById('verbsList');
const verbDetail = document.getElementById('verbDetail');
const categoryTitle = document.getElementById('categoryTitle');
const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');
const searchInput = document.getElementById('searchInput');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const visionPreview = document.getElementById('visionPreview');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearImageBtn = document.getElementById('clearImageBtn');
const visionResult = document.getElementById('visionResult');
const analysisText = document.getElementById('analysisText');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// ===== Initialize =====
async function init() {
    await loadVerbs();
    loadTheme();
    loadHistory();
    setupEventListeners();
    renderCategories();
}

// ===== Load Verbs from JSON =====
async function loadVerbs() {
    try {
        const response = await fetch(chrome.runtime.getURL('korean_verbs.json'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        koreanVerbs = await response.json();
        console.log(`Loaded ${koreanVerbs.length} Korean verbs`);
    } catch (error) {
        console.error('Error loading verbs:', error);
        // Fallback: show error message
        categoriesGrid.innerHTML = '<div style="padding: 20px; color: red;">Error loading verbs. Please reload the extension.</div>';
        koreanVerbs = [];
    }
}

// ===== Theme Management =====
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
}

// ===== Tab Navigation =====
function setupTabNavigation() {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ===== Categories =====
function renderCategories() {
    const categories = [...new Set(koreanVerbs.map(v => v.category))];
    categoriesGrid.innerHTML = '';

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => selectCategory(category, btn));
        categoriesGrid.appendChild(btn);
    });
}

function selectCategory(category, btn) {
    currentCategory = category;
    currentCategoryVerbs = koreanVerbs.filter(v => v.category === category);
    currentVerbIndex = 0;
    
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    categoryTitle.textContent = `${category} Verbs (${currentCategoryVerbs.length})`;
    resetBtn.style.display = 'inline-block';
    renderVerbs(category);
}

// ===== Verbs List =====
function renderVerbs(category) {
    const verbs = koreanVerbs.filter(v => v.category === category);
    verbsList.innerHTML = '';

    verbs.forEach(verb => {
        const card = document.createElement('div');
        card.className = 'verb-card';
        card.innerHTML = `
            <div class="verb-korean">${verb.verb}</div>
            <div class="verb-romanization">${verb.verb_romanization}</div>
            <div class="verb-english">${verb.english_meaning}</div>
        `;
        card.addEventListener('click', () => selectVerb(verb));
        verbsList.appendChild(card);
    });
}

function selectVerb(verb) {
    currentVerb = verb;
    currentVerbIndex = currentCategoryVerbs.findIndex(v => v.id === verb.id);
    
    verbsList.style.display = 'none';
    verbDetail.style.display = 'block';

    document.getElementById('detailVerb').textContent = verb.verb;
    document.getElementById('detailRomanization').textContent = verb.verb_romanization;
    document.getElementById('detailEnglish').textContent = verb.english_meaning;
    document.getElementById('exampleKorean').textContent = verb.korean_sentence;
    document.getElementById('exampleRomanization').textContent = verb.korean_sentence_romanization;
    document.getElementById('exampleEnglish').textContent = verb.english_sentence;

    // Update counter
    updateVerbCounter();

    // Reset AI response
    document.getElementById('aiResponse').style.display = 'none';
    document.getElementById('aiText').textContent = '';

    addToHistory(verb);
}

function updateVerbCounter() {
    const counter = document.getElementById('verbCounter');
    counter.textContent = `${currentVerbIndex + 1} / ${currentCategoryVerbs.length}`;
}

function goToPreviousVerb() {
    if (currentVerbIndex > 0) {
        currentVerbIndex--;
        selectVerb(currentCategoryVerbs[currentVerbIndex]);
        scrollToTop();
    }
}

function goToNextVerb() {
    if (currentVerbIndex < currentCategoryVerbs.length - 1) {
        currentVerbIndex++;
        selectVerb(currentCategoryVerbs[currentVerbIndex]);
        scrollToTop();
    }
}

function scrollToTop() {
    document.querySelector('.verb-detail').scrollTop = 0;
}

// ===== Pronunciation =====
function speakText(text, lang = 'ko-KR') {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

// ===== AI Explanation =====
async function getAIExplanation() {
    if (!currentVerb) return;

    const aiBtn = document.getElementById('aiExplainBtn');
    const aiResponse = document.getElementById('aiResponse');
    const aiText = document.getElementById('aiText');

    aiBtn.disabled = true;
    showLoading(true);

    try {
        const prompt = `Provide a detailed but concise explanation of the Korean verb "${currentVerb.verb}" (${currentVerb.verb_romanization}). 
        
Meaning: ${currentVerb.english_meaning}
Example: ${currentVerb.korean_sentence} (${currentVerb.english_sentence})

Explain:
1. The verb's meaning and usage
2. Common conjugations
3. Tips for remembering it
4. Related verbs

Keep the explanation engaging and helpful for learners.`;

        const response = await fetch(POLLINATION_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'openai',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert Korean language teacher. Provide clear, engaging explanations for Korean verbs.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: TEMPERATURE,
                max_tokens: 500
            })
        });

        const data = await response.json();
        const explanation = data.choices[0].message.content;

        // Format text with proper line breaks and spacing
        const formattedText = explanation
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n\n');

        aiText.innerHTML = formattedText
            .split('\n\n')
            .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
            .join('');
        
        aiResponse.style.display = 'block';
    } catch (error) {
        console.error('Error getting AI explanation:', error);
        aiText.textContent = 'Sorry, I encountered an error. Please try again.';
        aiResponse.style.display = 'block';
    } finally {
        aiBtn.disabled = false;
        showLoading(false);
    }
}

// ===== Chat =====
async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';

    showLoading(true);

    try {
        const systemMessage = {
            role: 'system',
            content: `You are a friendly and knowledgeable Korean language teacher. You help students learn Korean verbs, grammar, and culture. 
You have access to a database of Korean verbs and can provide explanations, examples, and tips. 
Be encouraging, clear, and engaging in your responses. Use Korean phrases when appropriate.`
        };

        const messages = [
            systemMessage,
            ...chatHistory.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            {
                role: 'user',
                content: message
            }
        ];

        const response = await fetch(POLLINATION_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'openai',
                messages: messages,
                temperature: TEMPERATURE,
                max_tokens: 500
            })
        });

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        chatHistory.push({ role: 'user', content: message });
        chatHistory.push({ role: 'assistant', content: botResponse });

        addChatMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error sending chat message:', error);
        addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
    } finally {
        showLoading(false);
    }
}

function addChatMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    messageDiv.innerHTML = `<div class="message-content"><p>${escapeHtml(content)}</p></div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== Vision Analysis =====
async function analyzeImage() {
    if (!previewImage.src) return;

    analyzeBtn.disabled = true;
    showLoading(true);

    try {
        // Convert image to base64
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const base64 = canvas.toDataURL('image/jpeg').split(',')[1];

            try {
                const response = await fetch(POLLINATION_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'openai',
                        messages: [{
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: 'Analyze this image and provide insights. If there are any Korean texts or objects, explain them in the context of Korean language learning. Be creative and engaging!'
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64}`
                                    }
                                }
                            ]
                        }],
                        temperature: TEMPERATURE,
                        max_tokens: 500
                    })
                });

                const data = await response.json();
                const analysis = data.choices[0].message.content;

                analysisText.textContent = analysis;
                visionResult.style.display = 'block';
            } catch (error) {
                console.error('Error analyzing image:', error);
                analysisText.textContent = 'Sorry, I encountered an error analyzing the image.';
                visionResult.style.display = 'block';
            } finally {
                analyzeBtn.disabled = false;
                showLoading(false);
            }
        };
        img.src = previewImage.src;
    } catch (error) {
        console.error('Error preparing image:', error);
        analyzeBtn.disabled = false;
        showLoading(false);
    }
}

// ===== History =====
function addToHistory(verb) {
    const historyItem = {
        verb: verb.verb,
        meaning: verb.english_meaning,
        timestamp: new Date().toLocaleString()
    };

    learningHistory.unshift(historyItem);
    if (learningHistory.length > 50) learningHistory.pop();

    saveHistory();
}

function loadHistory() {
    const saved = localStorage.getItem('learningHistory');
    if (saved) {
        learningHistory = JSON.parse(saved);
        renderHistory();
    }
}

function saveHistory() {
    localStorage.setItem('learningHistory', JSON.stringify(learningHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';

    if (learningHistory.length === 0) {
        historyList.innerHTML = '<div class="history-empty">No learning history yet. Start learning!</div>';
        return;
    }

    learningHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-verb">${item.verb}</div>
            <div class="history-meaning">${item.meaning}</div>
            <div class="history-time">${item.timestamp}</div>
        `;
        historyList.appendChild(div);
    });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear your learning history?')) {
        learningHistory = [];
        saveHistory();
    }
}

// ===== Utility Functions =====
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Theme
    themeToggle.addEventListener('click', toggleTheme);

    // Tabs
    setupTabNavigation();

    // Categories & Verbs
    resetBtn.addEventListener('click', () => {
        currentCategory = null;
        verbsList.style.display = 'block';
        verbDetail.style.display = 'none';
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        categoryTitle.textContent = 'Select a category';
        resetBtn.style.display = 'none';
    });

    backBtn.addEventListener('click', () => {
        verbsList.style.display = 'block';
        verbDetail.style.display = 'none';
    });

    const backBtnBottom = document.getElementById('backBtnBottom');
    if (backBtnBottom) {
        backBtnBottom.addEventListener('click', () => {
            verbsList.style.display = 'block';
            verbDetail.style.display = 'none';
        });
    }

    // Previous/Next Navigation
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtnBottom = document.getElementById('prevBtnBottom');
    const nextBtnBottom = document.getElementById('nextBtnBottom');

    if (prevBtn) prevBtn.addEventListener('click', goToPreviousVerb);
    if (nextBtn) nextBtn.addEventListener('click', goToNextVerb);
    if (prevBtnBottom) prevBtnBottom.addEventListener('click', goToPreviousVerb);
    if (nextBtnBottom) nextBtnBottom.addEventListener('click', goToNextVerb);

    // Search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!currentCategory) return;

        const filtered = koreanVerbs.filter(v =>
            v.category === currentCategory &&
            (v.verb.includes(query) ||
                v.verb_romanization.includes(query) ||
                v.english_meaning.toLowerCase().includes(query))
        );

        verbsList.innerHTML = '';
        filtered.forEach(verb => {
            const card = document.createElement('div');
            card.className = 'verb-card';
            card.innerHTML = `
                <div class="verb-korean">${verb.verb}</div>
                <div class="verb-romanization">${verb.verb_romanization}</div>
                <div class="verb-english">${verb.english_meaning}</div>
            `;
            card.addEventListener('click', () => selectVerb(verb));
            verbsList.appendChild(card);
        });
    });

    // Pronunciation
    document.getElementById('speakBtn').addEventListener('click', () => {
        if (currentVerb) speakText(currentVerb.verb);
    });

    document.getElementById('speakExampleBtn').addEventListener('click', () => {
        if (currentVerb) speakText(currentVerb.korean_sentence);
    });

    // AI Explanation
    document.getElementById('aiExplainBtn').addEventListener('click', getAIExplanation);

    // Speak AI Text
    const speakAiBtn = document.getElementById('speakAiBtn');
    if (speakAiBtn) {
        speakAiBtn.addEventListener('click', () => {
            const aiText = document.getElementById('aiText');
            const label = document.getElementById('speakAiLabel');
            
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
                label.textContent = 'Speak';
                speakAiBtn.classList.remove('speaking');
            } else {
                const text = aiText.innerText;
                if (text) {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'en-US';
                    utterance.rate = 0.9;
                    utterance.onend = () => {
                        label.textContent = 'Speak';
                        speakAiBtn.classList.remove('speaking');
                    };
                    label.textContent = 'Stop';
                    speakAiBtn.classList.add('speaking');
                    speechSynthesis.speak(utterance);
                }
            }
        });
    }

    // Chat
    sendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Vision
    uploadBtn.addEventListener('click', () => imageInput.click());

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImage.src = event.target.result;
                visionPreview.style.display = 'block';
                visionResult.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    analyzeBtn.addEventListener('click', analyzeImage);

    clearImageBtn.addEventListener('click', () => {
        previewImage.src = '';
        visionPreview.style.display = 'none';
        visionResult.style.display = 'none';
        imageInput.value = '';
    });

    // History
    clearHistoryBtn.addEventListener('click', clearHistory);
}

// ===== Start Application =====
init();
