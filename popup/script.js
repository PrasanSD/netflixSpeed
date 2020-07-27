// Listen for clicks on the buttons, and send the appropriate message to
// the content script in the page.
function listenForClicks() {
  document.addEventListener("click", e => {
    function onClick(number) {
      return parseFloat(number);
    };

    // Receive clicked value
    // and send a message with the value
    function sendSpeedValue(tabs) {
      let speed = onClick(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          speed: speed,
        });
    };

    // send a "reset" message to the content script in the active tab,
    // that sets the vid speed to 1
    function reset(tabs) {
    	browser.tabs.sendMessage(tabs[0].id, {
          speed: 1,
      });
    };

    // Log the error to the console.    
    function reportError(error) {
      console.error(`Whoops, there was some error: ${error}`);
    };

    // Get the active tab, then call sendSpeedValue or reset as appropriate.    
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

// There was an error executing the script.
// Display the popup's error message.
function reportExecuteScriptError(error) {
	console.error(`Failed to execute content script: ${error.message}`);
};

// When the popup loads, inject a content script into the active tab,
// and add a click handler.
// If we couldn't inject the script, handle the error.
browser.tabs.executeScript({file: "/content_scripts/app.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

