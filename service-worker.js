let result;
let website;
chrome.runtime.onMessage.addListener(
    function(msg){
        result = msg.message;
        website = msg.website;
    }
);
chrome.tabs.onUpdated.addListener(
    function(tabId,changeInfo){
        if(changeInfo.url){
            if(website == 'greenhouse' && changeInfo.url.includes('confirmation')){
                console.log(result)
            }
        }
    }
);