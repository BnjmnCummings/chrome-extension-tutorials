/** Extensions can monitor browser events in the background using the extension's service worker. 
 * Service workers are special JavaScript environments that handle events and terminate when they're not needed. */


/** The first event our service worker will listen for is runtime.onInstalled(). 
 * This method allows the extension to set an initial state or complete some tasks on installation. 
 * Extensions can use the Storage API and IndexedDB to store the application state. 
 * In this case, though, since we're only handling two states, 
 *  we will use the action's badge text itself to track whether the extension is 'ON' or 'OFF'. */

// this is used to track whether the ext is on or off using the badge's text itseld
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

/**
 * if we're on a website which belongs to extensions or webstore, 
 * then change the chrome badge state (for this tab) to on or off (flip it).
 */
const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

chrome.action.onClicked.addListener(async (tab) => {

  // if we're on on of the listed websites ^^^
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    //Yes. You can use scripting.executeScript() to inject JavaScript.

    if (nextState === "ON") {
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ["focus.css"],
          target: { tabId: tab.id },
        });
      } else if (nextState === "OFF") {
        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
          files: ["focus.css"],
          target: { tabId: tab.id },
        });
      }
  }
});
