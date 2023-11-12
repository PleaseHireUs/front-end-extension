let time;
let url;
let position;
let website;
let companyName;
chrome.runtime.onMessage.addListener(
    function(msg){
        url = msg.url;
        website = msg.website;
        position = msg.position;
        time = msg.time;
        companyName = msg.company;
    }
);
chrome.tabs.onUpdated.addListener(
    function(tabId,changeInfo){
        if(changeInfo.url){
            if(website == 'greenhouse' && changeInfo.url.includes('confirmation')){
                fetch("http://34.125.250.172:5000/addJobApps",{
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    "userId": "123",
                    "emailId": "test@gmail.com",
                    "platform": website,
                    "jobTitle": position,
                    "createdDate": time,
                    "jobUrl": url,
                    "companyName":companyName
                })})
            }
            if(website == 'workday' && changeInfo.url.includes('userHome')){
                fetch("http://34.125.250.172:5000/addJobApps",{
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    "userId": "123",
                    "emailId": "test@gmail.com",
                    "platform": website,
                    "jobTitle": position,
                    "createdDate": time,
                    "jobUrl": url,
                    "companyName":companyName
                })})
            }
        }
    }
);