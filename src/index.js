console.log("Hello World");
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["DOM_PARSER"],
      justification: "testing",
    });
  }
  
  chrome.runtime.onMessage.addListener(async (msg) => {
    switch (msg.type) {
      case "play":
        await createOffscreen();
        await chrome.runtime.sendMessage({
          type: "play",
          play: msg.play,
          offscreen: true,
        });
        break;
      case "pause":
        await createOffscreen();
        await chrome.runtime.sendMessage({ type: "pause", offscreen: true });
        break;
    }
  });