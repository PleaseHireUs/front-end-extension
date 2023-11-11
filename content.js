let currentUrl = window.location.href;
// The regexes for different websites
let greenHouseRegex = /https:\/\/boards.greenhouse.io\/*/;
let submitButton;
let position;
let time;//This is going to be encoded in a number
let company;
// Make the button correspond to the submit button
if(greenHouseRegex.test(currentUrl)){
    submitButton = document.querySelector('input[value="Submit Application"]');
    position = document.querySelector('h1').innerHTML;
    company = document.querySelector('span[class="company-name"]').innerHTML.trim().substring(3)
}
submitButton.addEventListener('click', function() {
    time = Date.now();
    let jsonObject = {
        "url":currentUrl,
        "position":position,
        "time": time,
        "company": company
    };
    let result = JSON.stringify(jsonObject);
    console.log(result)

