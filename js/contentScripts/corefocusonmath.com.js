function fixLinks() {
  var redirectFixedLinks = 0;
  var newTabFixedLinks = 0;
  for (link of document.querySelectorAll(
    "a[href^='https://www.corefocusonmath.com/classrooms/mod/resource/view.php']"
  )) {
    if (!link.href.includes("redirect")) {
      link.href += "&redirect=1";
      redirectFixedLinks += 1;
    }
    if (/onclick=.*;"/.test(link.outerHTML)) {
      if (newTabFixedLinks == 0) console.log(link.outerHTML);
      link.outerHTML = link.outerHTML
        .replace(/onclick=.*;"/, "")
        .replace(/><img/, " target='blank'><img");
      newTabFixedLinks += 1;
    }
  }
  if (redirectFixedLinks > 0) {
    console.log("Fixed", redirectFixedLinks, "link(s) to auto go to content.");
  }
  if (newTabFixedLinks > 0) {
    console.log(
      "Fixed",
      newTabFixedLinks,
      "link(s) to open in new tab instead of window."
    );
  }
}
setInterval(fixLinks, 1000);
console.log("Link fixing will happen every 1s.");
if (document.querySelector("#frontpage-course-list .coursebox") !== null) {
  for (book of document.querySelectorAll("#frontpage-course-list .coursebox")) {
    console.log("Fixed a course to link to the whole thing.");
    book.style.cursor = "pointer";
    book.onclick = () => {
      window.location.href = book.querySelector("a").href;
    };
  }
}
