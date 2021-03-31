console.log("When blurred, this Zoom window will be closed.");
window.onblur = () => {
  console.log("Closing in 3 seconds.");
  setTimeout(() => {
    console.log("Closing.");
    chrome.runtime.sendMessage({ closeThis: true });
  }, 3 * 1000);
};
