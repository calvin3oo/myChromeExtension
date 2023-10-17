// This code/function should allow the 'chrome popup' to be able to access things in the DOM outside of the popup
const reasonTypes = chrome.offscreen.Reason;
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument())
        return;
    chrome.offscreen.createDocument({
        url: "offscreen.html",
        reasons: [reasonTypes.LOCAL_STORAGE, reasonTypes.DOM_PARSER],
        justification: "testing",
    });
}
console.log("Hello World");
console.log("from inside chrome ext");
console.log(document.querySelectorAll('div'));
