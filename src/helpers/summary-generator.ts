// @ts-nocheck 
import { MODEL_CONFIGS } from '../constants';

function downloadProgressLogger(message: string, progress: { loaded: number; total: number }) {
    console.log(`${message} (${progress.loaded}/${progress.total})`);
}

async function createSummarizer() {
    if (!window.ai || !window.ai.summarizer) {
      throw new Error('AI Summarization is not supported in this browser');
    }
    const canSummarize = await window.ai.summarizer.capabilities();
    if (canSummarize.available === 'no') {
      throw new Error('AI Summarization is not supported');
    }
    const summarizationSession = await self.ai.summarizer.create(
        MODEL_CONFIGS,
        downloadProgressLogger
    );
    if (canSummarize.available === 'after-download') {
      summarizationSession.addEventListener(
        'downloadprogress',
        downloadProgressLogger
      );
      await summarizationSession.ready;
    }
    return summarizationSession;
}

export async function summaryGenerator(text: string) {
    try {
        const session = await createSummarizer();
        const summary = await session.summarize(text);
        session.destroy();
        return summary;
    } catch (error) {
        console.error('AI Summarization Error: ', error);
        return 'AI Summarization is not supported';
    }
}
