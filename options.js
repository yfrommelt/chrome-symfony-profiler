// Saves options to chrome.storage
function saveOptions() {
    const page = document.querySelector('#page').value;
    chrome.storage.sync.set({
        defaultPage: page
    }, function () {
        // Update status to let user know options were saved.
        const status = document.querySelector('#status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get({
        defaultPage: 'request'
    }, function (items) {
        document.querySelector('#page').value = items.defaultPage;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#page').addEventListener('change', saveOptions);