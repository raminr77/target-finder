import { useState, useEffect } from 'react';
import { Content } from './components/content';
import { APP_VERSION } from './constants';
import type { TabContent } from './types';

export function App() {
  const [targets, setTargets] = useState<string[]>([]);
  const [tabContentData, setTabContentData] = useState<TabContent | null>(null);

  const handleSummarize = () => {
      setTargets(targets);  
  };

  useEffect(() => {
    chrome.tabs.query({
      active: true, lastFocusedWindow: true
    }).then((tabs) => {
      const tabId = tabs[0].id || 0;
      chrome.tabs.sendMessage(tabId, '', (response: { content: string }) => {
        setTabContentData({
          ...response,
          ...tabs[0]
        });
      });
    });
  }, []);

  return (
    <div className="target-finder-container flex justify-center flex-col gap-2 select-none">
      <header className="flex justify-between mb-3 shadow-md p-4">
        <img className="h-8" src="Logo-with-text.png" />
        <div className='flex items-center gap-2'>
          <button
            onClick={handleSummarize}
            className="bg-violet-600 hover:bg-violet-500 duration-300 rounded-md px-3 leading-8 text-sm"
          >
            Summarize Content
          </button>
        </div>
      </header>

      <Content title={tabContentData?.title} />

      <footer className='p-4 text-xs flex items-center justify-center'>
        {`Version ${APP_VERSION}`}
      </footer>
    </div>
  )
}
