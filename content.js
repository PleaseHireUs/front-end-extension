let currentUrl = window.location.href;
let greenHouseRegex = /https:\/\/boards.greenhouse.io\/.*/;
let workdayRegex = /.*wd1.myworkdayjobs.com.*/
let submitButton;
let position;
let time;//This is going to be encoded in a number
let company;
let website;
setTimeout(()=>{
    if(greenHouseRegex.test(currentUrl) && document.querySelector('input[value="Submit Application"]')){
        submitButton = document.querySelector('input[value="Submit Application"]');
        position = document.querySelector('h1').innerHTML.trim();
        company = document.querySelector('span[class="company-name"]').innerHTML.trim().substring(3)
        website = "greenhouse"
    }
    else if(workdayRegex.test(currentUrl) && document.querySelector('button[data-automation-id="bottom-navigation-next-button"]'))
    //  && document.querySelector('button[data-automation-id="bottom-navigation-next-button"]').innerHTML == 'Submit')
    {
        company = currentUrl.substring(currentUrl.indexOf('://')+3,currentUrl.indexOf('.wd1.myworkdayjobs.com'))
        website = "workday"
        position = document.querySelector('h3[class="css-y2pr05"]').innerHTML.trim()
        submitButton = document.querySelector('button[data-automation-id="bottom-navigation-next-button"]')
    }
    //logic for sending message to service-worker
    if(submitButton){
        submitButton.addEventListener('click', function() {
            time = Date.now();
            let jsonObject = {
                "url":currentUrl,
                "position":position,
                "time": time,
                "company": company
            };
            let result = JSON.stringify(jsonObject);
            chrome.runtime.sendMessage({message:result,website:website})
        });    
    }
    
},5000);
// Make the button correspond to the submit button
