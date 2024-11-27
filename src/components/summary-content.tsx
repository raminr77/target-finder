import DOMPurify from 'dompurify';
import { marked } from 'marked';

export function SummaryContent({ text = '' }: { text: string }) {
    const mdContent = marked.parse(text) as string;
    return (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mdContent) }} />
    );
}
