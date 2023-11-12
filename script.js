var ele = document.getElementById("test");
ele.addEventListener("click", function () {
  var newUrl = "localhost:8080/login";
  chrome.tabs.create({ url: newUrl });
});

var ele2 = document.getElementById("test2");
ele2.addEventListener("click", function () {
  // chrome.storage.sync.set({ token: "yeet" });
  chrome.storage.sync.get("token", function (tok) {
    var newUrl = "localhost:8080/status/" + tok.token;
    const req = {
      token: tok.token,
      url: "currentUrl",
      website: "website",
      position: "position",
      company: "company",
    };
    // fetch("http://localhost:8080/addjob", {
    //   method: "POST",
    //   body: JSON.stringify(req),
    // });
    chrome.tabs.create({ url: newUrl });
  });
});
