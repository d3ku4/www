function openTab(tabId) {
    // Find and remove the 'active' class from the currently active tab
    const activeTabContent = document.querySelector('.tab-content.active');
    if (activeTabContent) {
        activeTabContent.classList.remove('active');
    }

    // Find and remove the 'active' class from the currently active button
    const activeTabButton = document.querySelector('.tab-button.active');
    if (activeTabButton) {
        activeTabButton.classList.remove('active');
    }

    // Show selected tab
    document.getElementById(tabId).classList.add('active');

    // Set active button
    const newActiveButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    if (newActiveButton) {
        newActiveButton.classList.add('active');
    }
}
