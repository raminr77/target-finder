chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({
    content: document.body.innerHTML
  });
});
