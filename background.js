// ===== Service Worker for Korean Verbs AI Extension =====

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Korean Verbs AI extension installed!');
        // Removed auto-opening of GitHub page for store compliance
    }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getVerbs') {
        // Fetch verbs data
        fetch('korean_verbs.json')
            .then(response => response.json())
            .then(data => sendResponse({ verbs: data }))
            .catch(error => sendResponse({ error: error.message }));
        return true; // Keep channel open for async response
    }
});

// Context menu is optional - removed to avoid permission issues

console.log('Korean Verbs AI Service Worker loaded');
