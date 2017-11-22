(function (chrome, window) {
    "use strict";

    function onWindowLoad() {
        const TOKEN_LINK_NAME = 'X-Debug-Token-Link';
        const headers = {};

        chrome.webRequest.onHeadersReceived.addListener(function (details) {
            const responseHeaders = details.responseHeaders;
            const tabId = details.tabId;

            if (Array.isArray(responseHeaders)) {
                // Check if headers contains token link
                const link = responseHeaders.filter(obj => TOKEN_LINK_NAME === obj.name).map(x => x.value);

                // If there is a link, store it
                if (link.length) {
                    headers[tabId] = link[0];
                }
            }
        }, {urls: ['http://*/*']}, ['responseHeaders']);

        chrome.browserAction.onClicked.addListener(function (tab) {
            const link = headers[tab.id];

            // If there's a link, open it in a new tab
            if (undefined !== link && link.length > 0) {
                chrome.tabs.create({url: link});
            }
        });
    }

    window.onload = onWindowLoad;
})(chrome, window);
