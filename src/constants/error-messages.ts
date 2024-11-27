export const ERROR_MESSAGES = {
    EMPTY_PAGE: "There's nothing to summarize! 🥲",
    MORE_THAN_MAXIMUM_LENGTH: (length: number) => `Text is too long for summarization with ${length} characters (maximum supported content length is ~4000 characters).`
} as const;