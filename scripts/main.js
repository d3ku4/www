// scripts.js
function openTab(tabId) {
    // ������ ��� �������
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // ������ �������� ����� �� ���� ������ �������
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // �������� ��������� �������
    document.getElementById(tabId).classList.add('active');

    // ���������� �������� ������
    document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`).classList.add('active');
}
