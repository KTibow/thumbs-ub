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
  (items) => {
    if (items.changeVideoLinks) {
      window.intervalId = setInterval(goToYoutube, 100);
    }
  }
);
// If user has opted out, make the experience better

// Remove the text ad next to the views
document.querySelector("#advExt").style.display = "none";
// Split on the & in &nbsp;||&nbsp;
document.querySelector("#views_text").innerHTML = document
  .querySelector("#views_text")
  .innerHTML.split("&")[0];
// Fix grammar while I'm at it
document.querySelector("#views_text").innerHTML = document
  .querySelector("#views_text")
  .innerHTML.replace("1 views", "1 view");
// Remove the crappy ads
// Okay imma rant
// THESE ADS WERE MADE BY GRANNYS WITH WORD 2000 https://i.imgur.com/NKQnV2Z.png
// WHY DOES IT LIST THE WEBSITE TWICE https://i.imgur.com/NKQnV2Z.png
// WHY ARE THERE DROP SHADOWS https://i.imgur.com/NKQnV2Z.png
// THE GIRL IS SO CREEPY https://i.imgur.com/Q5fS82y.jpeg
// THESE CHEAPSKATES ARE USING IMGUR FOR THEIR ADS
// SURELY COMMERCIAL USE REQUIRES A LICENSE OR SOMETHING
// LOOK AT THIS REVIVE ADSERVER NEEDS TO BE REVIVED https://serve.vitzo.com/www/admin/assets/images/login-welcome.gif
// ok rant over
document.querySelector("#prodContainer").style.display = "none";
// Remove branding
document.querySelector("#continuePlayBlock h1").style.visibility = "hidden";
document.querySelector("#continuePlayBlock span").style.visibility = "visible";
// They do this so that the "related videos" thing doesn't show
// But also free ad and branding space
document.querySelector("#continuePlayBlock span").innerHTML =
  "Continue playback?";
