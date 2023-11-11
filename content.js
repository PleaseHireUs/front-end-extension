let currentUrl = window.location.href;
// The regexes for different websites
let greenHouseRegex = /https:\/\/boards.greenhouse.io\/*/;
let submitButton;
let position;
let time; //This is going
// Make the button correspond to the submit button
if (greenHouseRegex.test(currentUrl)) {
  submitButton = document.querySelector('input[value="Submit Application"]');
  position = document.querySelector("h1").innerHTML;
}
submitButton.addEventListener("click", function () {
  time = Date.now();
});
