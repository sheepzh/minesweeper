import { IS_MV3 } from "./common"

export function addIconClickListener(listener: () => void): void {
    if (IS_MV3) {
        chrome.action.onClicked.addListener(listener)
    } else {
        chrome.browserAction.onClicked.addListener(listener)
    }
}