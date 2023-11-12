let currentUrl = window.location.href;
let greenHouseRegex = /https:\/\/boards.greenhouse.io\/.*/;
let workdayRegex = /.*\.myworkday.*/;
let tokenRegex = /http:\/\/localhost:8080\/oauthcallback.*/;
let submitButton;
let position;
let time; //This is going to be encoded in a number
let company;
let website;
let platform;
setTimeout(() => {
  if (
    greenHouseRegex.test(currentUrl) &&
    document.querySelector('input[value="Submit Application"]')
  ) {
    submitButton = document.querySelector('input[value="Submit Application"]');
    position = document.querySelector("h1").innerHTML.trim();
    company = document
      .querySelector('span[class="company-name"]')
      .innerHTML.trim()
      .substring(3);
    website = "greenhouse";
  } else if (
    workdayRegex.test(currentUrl) &&
    document.querySelector(
      'button[data-automation-id="bottom-navigation-next-button"]'
    )
  ) {
    console.log("Bye");
    //  && document.querySelector('button[data-automation-id="bottom-navigation-next-button"]').innerHTML == 'Submit')
    company = currentUrl.substring(
      currentUrl.indexOf("://") + 3,
      currentUrl.indexOf(".myworkday") - 4
    );
    if (company.length == 0) {
      let linkedin = document.querySelector("a[title='LinkedIn']").href;
      let temp = linkedin.substring(linkedin.indexOf("company") + 8);
      company = temp.substring(0, temp.indexOf("/"));
    }
    website = "workday";
    position = document
      .querySelector('h3[class="css-y2pr05"]')
      .innerHTML.trim();
    submitButton = document.querySelector(
      'button[data-automation-id="bottom-navigation-next-button"]'
    );
    currentUrl = currentUrl.substring(0, currentUrl.indexOf("/apply/"));
  } else if (tokenRegex.test(currentUrl)) {
    chrome.storage.sync.set({ token: document.body.innerText.trim() });
    window.close();
  }
  //logic for sending message to service-worker
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      chrome.storage.sync.get("token", function (tok) {
        chrome.runtime.sendMessage({
          token: tok.token,
          url: currentUrl,
          website: website,
          position: position,
          company: company,
        });
      });
    });
  }
}, 5000);
// Make the button correspond to the submit button
