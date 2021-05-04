console.log(
  "Loaded main JS initially at",
  new Date(),
  new Date().getMilliseconds()
);
var theStyle = document.createElement("style");
theStyle.id = "👍";
const addStyleAndRetry = () => {
  if (document.body) {
    document.body.appendChild(theStyle);
    console.log("Style tag injected.");
  } else {
    console.log("Not loaded yet.");
    setTimeout(addStyleAndRetry, 25); // Account for slow loading
  }
};
addStyleAndRetry();
const loadStyle = (items) => {
  var flavor = items.uiFlavor.replace("disabled", "");
  var websiteName = window.location.hostname
    .replace(".com", "")
    .split(".")
    .slice(-1);
  window.mainStyleLoaded = false;
  theStyle.innerHTML = "";
  if (flavor != "") {
    var styleURL = `styles/${websiteName}/${flavor}.css`;
    console.log("Loading style at", styleURL);
    fetch(chrome.extension.getURL(styleURL))
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        theStyle.innerHTML += text;
        window.mainStyleLoaded = true;
        console.log(
          "Finished loading",
          styleURL,
          "at",
          new Date(),
          new Date().getMilliseconds()
        );
      });
  }
  if (items.darkMode) {
    var darkStyleURL = `styles/${websiteName}/${flavor}Dark.css`;
    console.log("Loading dark style at", darkStyleURL);
    fetch(chrome.extension.getURL(darkStyleURL))
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        while (flavor != "" && !window.mainStyleLoaded);
        theStyle.innerHTML += text;
        console.log(
          "Finished loading",
          darkStyleURL,
          "at",
          new Date(),
          new Date().getMilliseconds()
        );
      });
  }
};
chrome.storage.sync.get(
  {
    uiFlavor: "disabled",
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
  loadStyle
);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "updated") loadStyle(message.data);
});
