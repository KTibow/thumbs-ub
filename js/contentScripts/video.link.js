const goToYoutube = () => {
  console.log("Trying to load YouTube version");
  eval(
    document
      .querySelectorAll("body script:not([src])")[1]
      .innerHTML.split(";")[0]
  );
  window.location = `https://www.youtube.com/video/${videoId}`;
  clearInterval(window.intervalId);
};
chrome.storage.sync.get(
  {
    changeVideoLinks: true,
  },
  () => {
    window.intervalId = setInterval(goToYoutube, 100);
  }
);
