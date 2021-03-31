document.getElementById("save").addEventListener("click", () => {
  var uiFlavor = document.querySelector("input[type='radio']:checked").value;
  var darkMode = document.getElementById("dark").checked;
  var changeVideoLinks = document.getElementById("videolink").checked;
  var email = document.getElementById("email").value;
  chrome.storage.sync.set(
    {
      uiFlavor: uiFlavor,
      darkMode: darkMode,
      changeVideoLinks: changeVideoLinks,
      email: email,
    },
    () => {
      chrome.tabs.query({}, (tabs) => {
        var tab;
        for (tab of tabs) {
          chrome.tabs.sendMessage(tab.id, {
            type: "updated",
            data: { uiFlavor: uiFlavor, darkMode: darkMode },
          });
        }
      });
      window.location.reload();
    }
  );
});

const saveSettings = () => {
  chrome.storage.sync.get(
    {
      uiFlavor: "disabled",
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    },
    (items) => {
      chrome.tabs.query({}, (tabs) => {
        var tab;
        for (tab of tabs) {
          chrome.tabs.sendMessage(tab.id, {
            type: "updated",
            data: { uiFlavor: items.uiFlavor, darkMode: items.darkMode },
          });
        }
      });
    }
  );
};
document.getElementById("updateStyles").addEventListener("click", saveSettings);
saveSettings();
// Just in case our defaults here are different than the defaults of the scripts

document.getElementById("googleFormLink").addEventListener("click", () => {
  window.open("https://forms.gle/gvvXcoao5aerFWm58");
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    {
      uiFlavor: "disabled",
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      changeVideoLinks: true,
      email: "",
    },
    (items) => {
      document.querySelector(`input[value='${items.uiFlavor}']`).checked = true;
      document.getElementById("dark").checked = items.darkMode;
      document.getElementById("videolink").checked = items.changeVideoLinks;
      document.getElementById("email").value = items.email;
      document.querySelector(
        "link"
      ).href = `styles/options/${items.uiFlavor}Options.css`;
      if (items.darkMode) {
        var darkStyle = document.createElement("link");
        darkStyle.rel = "stylesheet";
        darkStyle.href = `styles/options/${items.uiFlavor}DarkOptions.css`;
        document.head.appendChild(darkStyle);
      }
    }
  );
});
