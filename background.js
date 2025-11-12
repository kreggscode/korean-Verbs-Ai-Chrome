// ===== Service Worker for Korean Verbs AI Extension =====

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Korean Verbs AI extension installed!');
        // Open welcome page
        chrome.tabs.create({
            url: 'https://github.com/kreggscode/korean-Verbs-Ai-Chrome'
        });
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

// Periodic cleanup of old history (optional)
chrome.alarms.create('cleanupHistory', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'cleanupHistory') {
        chrome.storage.local.get('learningHistory', (result) => {
            if (result.learningHistory && result.learningHistory.length > 100) {
                // Keep only the 100 most recent items
                const history = result.learningHistory.slice(0, 100);
                chrome.storage.local.set({ learningHistory: history });
            }
        });
    }
});

console.log('Korean Verbs AI Service Worker loaded');
