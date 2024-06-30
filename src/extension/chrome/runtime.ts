/**
 * Get the url of this extension
 *
 * @param path The path relative to the root directory of this extension
 */
export function getUrl(path: string): string {
    return chrome.runtime.getURL(path)
}
