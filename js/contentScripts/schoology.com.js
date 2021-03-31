var mainStyleTag;
for (styleTag of document.querySelectorAll("style")) {
  if (
    /^@import "https:\/\/asset-cdn\.schoology\.com\/assets\/drupal-css-files\/style_[0-9a-f_]*\.css";$/.test(
      styleTag.innerHTML
    )
  ) {
    mainStyleTag = styleTag;
  }
}
fetch(chrome.extension.getURL("schoologyStyle.css"))
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    mainStyleTag.innerHTML = text;
  });
