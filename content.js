let currentUrl = window.location.href;
let greenHouseRegex = /https:\/\/boards.greenhouse.io\/*/;
let submitButton;
let position;
let time;//This is going to be encoded in a number
let company;
let website;
// Make the button correspond to the submit button
if(greenHouseRegex.test(currentUrl) && document.querySelector('input[value="Submit Application"]')){
    submitButton = document.querySelector('input[value="Submit Application"]');
    position = document.querySelector('h1').innerHTML;
    company = document.querySelector('span[class="company-name"]').innerHTML.trim().substring(3)
    website = "greenhouse"
}
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
