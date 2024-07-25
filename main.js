
function openTab(tabId) {
    // Hide active tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show chosen tab
    document.getElementById(tabId).classList.add('active');

    // Set active button
    document.querySelector(`.tab-button`).classList.add('active');
}
