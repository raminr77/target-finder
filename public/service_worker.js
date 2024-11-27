async function showSummary(tabId) {
  const tab = await chrome.tabs.get(tabId);

  if (!tab.url.startsWith('http')) {
    return;
  }

  const injection = await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content-script.js']
  });

  chrome.storage.session.set({ pageContent: injection[0].result });
}

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener((activeInfo) => {
  showSummary(activeInfo.tabId);
});
chrome.tabs.onUpdated.addListener(async (tabId) => {
  showSummary(tabId);
});
