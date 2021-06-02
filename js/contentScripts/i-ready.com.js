setInterval(() => {
  var vidWrap = document.querySelector("#tutorialPlayerWrapper");
  console.log(vidWrap);
  if (vidWrap && !vidWrap.querySelector(".skipVid")) {
    var skipBtn = document.createElement("button");
    skipBtn.innerHTML = "⏩";
    skipBtn.onclick = () => {
      var vid = document.querySelector("video");
      vid.currentTime = vid.duration - 1;
    };
    skipBtn.style.position = "absolute";
    skipBtn.style.border = "none";
    skipBtn.style.bottom = "4pt";
    skipBtn.style.left = "calc(48px + 8pt)";
    skipBtn.style.height = "36px";
    skipBtn.className = "skipVid";
    vidWrap.appendChild(skipBtn);
  }
}, 500);