import { isProbablyReaderable, Readability } from '@mozilla/readability';

function canBeParsed(element: Document) {
  return isProbablyReaderable(element, {
    minContentLength: 100
  });
}

export function documentParser(document: Document) {
  if (!canBeParsed(document)) {
    throw new Error('Document Parse: Your page content is not parsable!');
  }

  const readableValues = new Readability(document).parse();
  return (readableValues?.textContent || '').trim();
}
