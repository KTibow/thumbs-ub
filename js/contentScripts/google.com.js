const login = () => {
  if (document.querySelector("div#headingSubtext")) {
    var theService = document
      .querySelector("div#headingSubtext")
      .innerText.toLowerCase();
    var shouldLogin = false;
    for (service of ["Zoom", "Flipgrid", "Schoology"]) {
      if (theService.includes(service.toLowerCase())) {
        shouldLogin = true;
      }
    }
    console.log("The service to log into is currently", theService);
    if (shouldLogin) {
      console.log(
        "Auto login should be preformed, so now asking chrome storage API for email."
      );
      chrome.storage.sync.get(
        {
          email: "",
        },
        (items) => {
          var userOption = document.querySelector(
            `[data-identifier="${items.email}"]`
          );
          if (userOption) {
            console.log(
              "Clicking on",
              userOption,
              "and clearing interval for",
              window.theLoginIntervalId
            );
            userOption.click();
            clearInterval(window.theLoginIntervalId);
          } else {
            console.log(
              `${items.email} isn't available here, so not trying to click.`
            );
          }
        }
      );
    } else {
      console.log("This service shouldn't be logged into. Canceling interval.");
      clearInterval(window.theLoginIntervalId);
    }
  } else {
    console.log("Page seems to still be loading.");
  }
};
window.theLoginIntervalId = setInterval(login, 400);
console.log("Loaded and ready to login.");
