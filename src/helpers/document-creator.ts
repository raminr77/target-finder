export function documentCreator(documentContent: string) {
    try {
        const newDocument = document.implementation.createHTMLDocument("New Document");
        newDocument.body.innerHTML = documentContent;
        return newDocument;
    } catch (error) {
        throw new Error(`Document Creator: ${error}`);
    }
}
