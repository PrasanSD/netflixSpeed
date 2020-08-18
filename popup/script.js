function listenForClicks() {
  document.addEventListener("click", e => {
    function onClick(number) {
      return parseFloat(number);
    };

    function sendSpeedValue(tabs) {
      let speed = onClick(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          speed: speed,
        });
    };

    function reset(tabs) {
    	browser.tabs.sendMessage(tabs[0].id, {
          speed: 1,
      });
    };

    function reportError(error) {
      console.error(`Whoops, there was some error: ${error}`);
    };
	  
    if (e.target.classList.contains("number")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(sendSpeedValue)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
};

function reportExecuteScriptError(error) {
	console.error(`Failed to execute content script: ${error.message}`);
};

browser.tabs.executeScript({file: "/content_scripts/app.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

