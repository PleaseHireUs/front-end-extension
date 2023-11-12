var ele = document.getElementById("test");
ele.addEventListener("click", function () {
  var newUrl = "localhost:8080/login";
  chrome.tabs.create({ url: newUrl });
});
