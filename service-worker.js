let time;
let url;
let position;
let website;
let companyName;
chrome.runtime.onMessage.addListener(
    function (msg) {
        url = msg.url;
        website = msg.website;
        position = msg.position;
        time = msg.time;
        companyName = msg.company;
    }
);
chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo) {
        if (changeInfo.url) {
            if (website == 'greenhouse' && changeInfo.url.includes('confirmation')) {
                chrome.storage.sync.get("token", function (tok) {
                    fetch("http://localhost:8080/addjob/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "token": tok.token,
                            "position": position,
                            "url": url,
                            "company": companyName
                        })
                    })
                });
            }
            if (website == 'workday' && changeInfo.url.includes('userHome')) {
                chrome.storage.sync.get("token", function (tok) {
                    fetch("http://localhost:8080/addjob/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "token": tok.token,
                            "position": position,
                            "url": url,
                            "company": companyName
                        })
                    })
                });
            }
        }
    }
);