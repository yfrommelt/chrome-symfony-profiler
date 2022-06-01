// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*


chrome.storage.sync.get({
    defaultPage: 'request'
}, function (items) {
    const profiler = document.querySelector('#profiler');
    const defaultPage = items.defaultPage;

    chrome.devtools.network.onRequestFinished.addListener(
        function (request) {
            if ('OPTION' !== request.request.method) {
                const xdebugTokenLink = request.response.headers.find(header => {
                    return ('x-debug-token-link' === header.name || 'X-Debug-Token-Link' === header.name);
                });
                if (xdebugTokenLink) {
                    profiler.src = xdebugTokenLink.value + '?panel=' + defaultPage;
                }
            }
        }
    );

});

// chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(xdebugTokenLink) + ');');
