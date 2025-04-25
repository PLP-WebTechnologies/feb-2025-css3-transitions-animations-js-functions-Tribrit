
// JavaScript code for the interactive web page

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const animationBox = document.getElementById('animationBox');
    const toggleAnimationBtn = document.getElementById('toggleAnimation');
    const clearStorageBtn = document.getElementById('clearStorage');
    const demoButton = document.getElementById('demoButton');
    const storageStatus = document.getElementById('storageStatus');
    const buttonStatus = document.getElementById('buttonStatus');
    const userPreferencesForm = document.getElementById('userPreferences');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userThemeSelect = document.getElementById('userTheme');

    // Load saved preferences
    loadPreferences();

    // Theme toggle functionality
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('darkMode', this.checked);
        showStatus(storageStatus, 'Theme preference saved!', 'success');
    });

    // Check for saved theme preference or system preference
    function applyThemePreference() {
        const savedMode = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode !== null) {
            const darkMode = savedMode === 'true';
            document.body.classList.toggle('dark-mode', darkMode);
            themeToggle.checked = darkMode;
        } else if (userThemeSelect.value === 'system') {
            document.body.classList.toggle('dark-mode', systemPrefersDark);
            themeToggle.checked = systemPrefersDark;
        }
    }

    // Animation box interaction
    animationBox.addEventListener('click', function() {
        this.classList.toggle('animate');
        const isAnimating = this.classList.contains('animate');
        showStatus(buttonStatus, isAnimating ? 'Animation started!' : 'Animation stopped', 'success');
    });

    //to Toggle animation button
    toggleAnimationBtn.addEventListener('click', function() {
        animationBox.classList.toggle('animate');
        const isAnimating = animationBox.classList.contains('animate');
        showStatus(buttonStatus, isAnimating ? 'Animation started!' : 'Animation stopped', 'success');
    });

    // emo button with ripple effect
    demoButton.addEventListener('click', function() {
        showStatus(buttonStatus, 'Button clicked! Ripple effect activated.', 'success');
    });

    // Clear local storage
    clearStorageBtn.addEventListener('click', function() {
        localStorage.clear();
        loadPreferences();
        showStatus(storageStatus, 'All local data has been cleared.', 'success');
    });

    // Save user preferences
    userPreferencesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userData = {
            name: userNameInput.value,
            email: userEmailInput.value,
            themePreference: userThemeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(userData));
        applyThemePreference();
        showStatus(storageStatus, 'Preferences saved successfully!', 'success');
    });

    // function to Load user preferences
    function loadPreferences() {
        const savedData = localStorage.getItem('userPreferences');
        
        if (savedData) {
            const userData = JSON.parse(savedData);
            userNameInput.value = userData.name || '';
            userEmailInput.value = userData.email || '';
            userThemeSelect.value = userData.themePreference || 'light';
            
            showStatus(storageStatus, 'Preferences loaded from storage.', 'success');
        } else {
            showStatus(storageStatus, 'No saved preferences found.', 'success');
        }
        
        applyThemePreference();
        
        // Show status briefly
        setTimeout(() => {
            storageStatus.classList.remove('show');
        }, 3000);
    }

    // function to Show status message
    function showStatus(element, message, type) {
        element.textContent = message;
        element.className = 'status-message show ' + type;
        
        setTimeout(() => {
            element.classList.remove('show');
        }, 3000);
    }

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        document.querySelectorAll('.animation-box, .btn').forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
    }
});
