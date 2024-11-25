const handleLoad = (tabData) => {
    console.log('Tab Content Loaded:', tabData);
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
