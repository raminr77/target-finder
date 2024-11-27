import { useRef, useState } from 'react';
import { Loading } from './components/loading';
import { MAX_MODEL_CHARACTERS, ERROR_MESSAGES } from './constants';
import { documentParser, documentCreator, summaryGenerator } from './helpers';
import { SummaryContent } from './components/summary-content';

export function App() {
  const pageContent = useRef<string>('');
  const [error, setError] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateSummary = (content: string) => {
    if (content.length > MAX_MODEL_CHARACTERS) {
      setError(ERROR_MESSAGES.MORE_THAN_MAXIMUM_LENGTH(content.length));
    }
    setIsLoading(true);
    summaryGenerator(content)
      .then(
        (result) => setSummary(result as string)
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const handleParseContent = (domContent: string) => {
    setError('');
    const htmlDocument = documentCreator(domContent);
    const newPageContent = documentParser(htmlDocument);

    if (pageContent.current !== newPageContent) {
      pageContent.current = newPageContent;

      if (newPageContent) {
        handleGenerateSummary(newPageContent);
      } else {
        setError(ERROR_MESSAGES.EMPTY_PAGE);
      }
    }
  };

  chrome.storage.session.get('pageContent', ({ pageContent }) => {
    handleParseContent(pageContent);
  });

  chrome.storage.session.onChanged.addListener((changes) => {
    const pageContent = changes['pageContent'];
    handleParseContent(pageContent.newValue);
  });
  
  return (
    <div className="w-full h-screen flex flex-col gap-2 select-none p-4">
      <SummaryContent text={summary} />
      {isLoading && (<Loading />)}
      
      {error && (
        <div className='text-sm text-red-500 w-full my-4'>{error}</div>
      )}
    </div>
  );
}
