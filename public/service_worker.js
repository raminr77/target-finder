const handleLoad = (tabData) => {
    console.log('handle AI', tabData);
    chrome.action.setBadgeText({ text: 'Active', tabId: tabData.id });
};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleLoad(tab);
});

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    handleLoad(tab);
  }
});
