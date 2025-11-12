// ===== Global Variables =====
let koreanVerbs = [];
let currentCategory = null;
let currentVerb = null;
let currentVerbIndex = 0;
let currentCategoryVerbs = [];
let chatHistory = [];
let learningHistory = [];
let currentPage = 'categories'; // categories, verbs, verb-detail

const POLLINATION_API = 'https://text.pollinations.ai/openai';
const TEMPERATURE = 1; // Creative responses

// ===== DOM Elements =====
const container = document.querySelector('.container');
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const backHeaderBtn = document.getElementById('backHeaderBtn');
const mainTabs = document.getElementById('mainTabs');

// Pages
const pageCategories = document.getElementById('page-categories');
const pageVerbs = document.getElementById('page-verbs');
const pageVerbDetail = document.getElementById('page-verb-detail');

// Categories & Verbs
const categoriesGrid = document.getElementById('categoriesGrid');
const categoryTitle = document.getElementById('categoryTitle');
const searchInput = document.getElementById('searchInput');
const verbsList = document.getElementById('verbsList');

// Verb Detail
const detailVerb = document.getElementById('detailVerb');
const detailRomanization = document.getElementById('detailRomanization');
const detailEnglish = document.getElementById('detailEnglish');
const exampleKorean = document.getElementById('exampleKorean');
const exampleRomanization = document.getElementById('exampleRomanization');
const exampleEnglish = document.getElementById('exampleEnglish');
const speakBtn = document.getElementById('speakBtn');
const speakEnBtn = document.getElementById('speakEnBtn');
const speakExampleBtn = document.getElementById('speakExampleBtn');
const aiExplainBtn = document.getElementById('aiExplainBtn');
const aiResponse = document.getElementById('aiResponse');
const aiText = document.getElementById('aiText');
const speakAiBtn = document.getElementById('speakAiBtn');
const prevVerbBtn = document.getElementById('prevVerbBtn');
const nextVerbBtn = document.getElementById('nextVerbBtn');

// Chat
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// Vision
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const visionPreview = document.getElementById('visionPreview');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearImageBtn = document.getElementById('clearImageBtn');
const visionResult = document.getElementById('visionResult');
const analysisText = document.getElementById('analysisText');

// History
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Loading
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

// ===== Page Navigation =====
function showPage(page) {
    pageCategories.classList.remove('active');
    pageVerbs.classList.remove('active');
    pageVerbDetail.classList.remove('active');

    if (page === 'categories') {
        pageCategories.classList.add('active');
        backHeaderBtn.style.display = 'none';
        currentPage = 'categories';
    } else if (page === 'verbs') {
        pageVerbs.classList.add('active');
        backHeaderBtn.style.display = 'block';
        currentPage = 'verbs';
    } else if (page === 'verb-detail') {
        pageVerbDetail.classList.add('active');
        backHeaderBtn.style.display = 'block';
        currentPage = 'verb-detail';
    }
}

// ===== Categories =====
function renderCategories() {
    const categories = [...new Set(koreanVerbs.map(v => v.category))];
    categoriesGrid.innerHTML = '';

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => selectCategory(category));
        categoriesGrid.appendChild(btn);
    });
}

function selectCategory(category) {
    currentCategory = category;
    currentCategoryVerbs = koreanVerbs.filter(v => v.category === category);
    currentVerbIndex = 0;
    
    categoryTitle.textContent = `${category} Verbs (${currentCategoryVerbs.length})`;
    renderVerbs();
    showPage('verbs');
}

// ===== Verbs List =====
function renderVerbs() {
    const verbs = currentCategoryVerbs;
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

// ===== Verb Detail =====
function selectVerb(verb) {
    currentVerb = verb;
    currentVerbIndex = currentCategoryVerbs.findIndex(v => v.id === verb.id);
    
    detailVerb.textContent = verb.verb;
    detailRomanization.textContent = verb.verb_romanization;
    detailEnglish.textContent = verb.english_meaning;
    exampleKorean.textContent = verb.korean_sentence;
    exampleRomanization.textContent = verb.korean_sentence_romanization;
    exampleEnglish.textContent = verb.english_sentence;

    // Update nav buttons
    prevVerbBtn.disabled = currentVerbIndex === 0;
    nextVerbBtn.disabled = currentVerbIndex === currentCategoryVerbs.length - 1;

    // Reset AI response
    aiResponse.style.display = 'none';
    aiText.textContent = '';

    addToHistory(verb);
    showPage('verb-detail');
}

function goToPreviousVerb() {
    if (currentVerbIndex > 0) {
        currentVerbIndex--;
        selectVerb(currentCategoryVerbs[currentVerbIndex]);
    }
}

function goToNextVerb() {
    if (currentVerbIndex < currentCategoryVerbs.length - 1) {
        currentVerbIndex++;
        selectVerb(currentCategoryVerbs[currentVerbIndex]);
    }
}

// ===== Pronunciation with Natural TTS =====
function speakText(text, lang = 'ko-KR', gender = 'female') {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = gender === 'female' ? 1.2 : 0.8;
    utterance.volume = 1;
    
    speechSynthesis.speak(utterance);
}

// ===== AI Explanation =====
async function getAIExplanation() {
    if (!currentVerb) return;

    aiExplainBtn.disabled = true;
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
        aiExplainBtn.disabled = false;
        showLoading(false);
    }
}

// ===== Speak AI Text =====
function setupSpeakAiButton() {
    if (speakAiBtn) {
        speakAiBtn.addEventListener('click', () => {
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
                    utterance.pitch = 1.2; // Female voice
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
}

// ===== Chat =====
async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addChatMessage(message, 'user');
    chatInput.value = '';

    showLoading(true);

    try {
        const systemMessage = {
            role: 'system',
            content: `You are a friendly and knowledgeable Korean language teacher. You help students learn Korean verbs, grammar, and culture. 
Keep responses concise and engaging. Use examples when helpful.`
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
                max_tokens: 300
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        chatHistory.push({ role: 'user', content: message });
        chatHistory.push({ role: 'assistant', content: botMessage });

        addChatMessage(botMessage, 'bot');
    } catch (error) {
        console.error('Error sending chat message:', error);
        addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
    } finally {
        showLoading(false);
    }
}

function addChatMessage(message, role) {
    const div = document.createElement('div');
    div.className = `chat-message ${role}-message`;
    div.innerHTML = `<div class="message-content"><p>${escapeHtml(message)}</p></div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== Vision Analysis =====
async function analyzeImage() {
    if (!previewImage.src) return;

    analyzeBtn.disabled = true;
    showLoading(true);

    try {
        const canvas = document.createElement('canvas');
        const img = new Image();
        
        img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

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
                            content: 'Analyze this image and describe what you see. If there are any Korean words or signs, translate them and explain their meaning. Relate the content to Korean language learning if possible.'
                        }, {
                            role: 'user',
                            content: 'image',
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`
                            }
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

// ===== Tab Navigation =====
function setupTabNavigation() {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Theme
    themeToggle.addEventListener('click', toggleTheme);

    // Tabs
    setupTabNavigation();

    // Back button
    backHeaderBtn.addEventListener('click', () => {
        if (currentPage === 'verb-detail') {
            showPage('verbs');
        } else if (currentPage === 'verbs') {
            showPage('categories');
        }
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!currentCategory) return;

        const filtered = currentCategoryVerbs.filter(v =>
            v.verb.includes(query) ||
            v.verb_romanization.includes(query) ||
            v.english_meaning.toLowerCase().includes(query)
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
    speakBtn.addEventListener('click', () => {
        if (currentVerb) speakText(currentVerb.verb, 'ko-KR', 'female');
    });

    speakEnBtn.addEventListener('click', () => {
        if (currentVerb) speakText(currentVerb.english_meaning, 'en-US', 'female');
    });

    speakExampleBtn.addEventListener('click', () => {
        if (currentVerb) speakText(currentVerb.korean_sentence, 'ko-KR', 'female');
    });

    // AI Explanation
    aiExplainBtn.addEventListener('click', getAIExplanation);
    setupSpeakAiButton();

    // Verb Navigation
    prevVerbBtn.addEventListener('click', goToPreviousVerb);
    nextVerbBtn.addEventListener('click', goToNextVerb);

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

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', init);
