// scripts.js
function openTab(tabId) {
    // Скрыть все вкладки
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Убрать активный класс со всех кнопок вкладок
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Показать выбранную вкладку
    document.getElementById(tabId).classList.add('active');

    // Установить активную кнопку
    document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`).classList.add('active');
}
