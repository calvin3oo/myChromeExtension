import { CANVAS_TOKEN } from './secrets.js';

// This code/function should allow the 'chrome popup' to be able to access things in the DOM outside of the popup
const reasonTypes = chrome.offscreen.Reason;
async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [reasonTypes.LOCAL_STORAGE, reasonTypes.DOM_PARSER],
    justification: "testing",
  });
}

function main(){
  // env var
  console.log(CANVAS_TOKEN);
  // localstorage
  console.log("writing to localstorage");
  writeJSONToLocalStorage("test", "hello world");
  console.log("reading from localstorage");
  console.log(readJSONFromLocalStorage("test"));
  createOffscreen()
  triggerEvent();
}

function triggerEvent(){
    // Send a "Hello, World!" message to the content script
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   chrome.scripting.executeScript({
    //     target: { tabId: tabs[0].id },
    //     func: () => {
    //       chrome.runtime.sendMessage({ greeting: 'Hello, World!' });
    //     },
    //   });
    // });
    chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
      chrome.scripting.executeScript({
          target: {
              tabId: tabs[0].id
          },
          func: () => {
            console.log("sending message");
            // trigger custom event on window
            window.dispatchEvent(new CustomEvent('custom'));
          },
      });
  });
  
}



// Function to write JSON data to localStorage
function writeJSONToLocalStorage(key: string, data: any): any {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    console.error("Error writing JSON to localStorage:", error);
    return false;
  }
}

// Function to read JSON data from localStorage
function readJSONFromLocalStorage(key: string): any {
  try {
    const jsonData = localStorage.getItem(key);
    if (jsonData === null) {
      return null;
    }
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading JSON from localStorage:", error);
    return null;
  }
}


main();