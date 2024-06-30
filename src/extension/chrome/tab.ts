import { handleError, IS_MV3 } from "./common"

export function getCurrentWindow(): Promise<chrome.windows.Window> {
    if (IS_MV3) {
        return chrome.windows.getCurrent()
    } else {
        return new Promise(resolve => chrome.windows.getCurrent(tab => {
            handleError("getCurrentWindow")
            resolve(tab)
        }))
    }
}

export function queryTabs(query: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
    if (IS_MV3) {
        return chrome.tabs.query(query)
    } else {
        return new Promise(resolve => chrome.tabs.query(query, tabs => {
            handleError("queryTabs")
            resolve(tabs)
        }))
    }
}

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
    if (IS_MV3) {
        return chrome.tabs.getCurrent()
    } else {
        return new Promise(resolve => chrome.tabs.getCurrent(tab => {
            handleError("getCurrentTab")
            resolve(tab)
        }))
    }
}

/**
 * Create one tab after current tab.
 *
 * Must not be invoked in background.js
 */
export async function createTabAfterCurrent(url: string, currentTab?: chrome.tabs.Tab): Promise<chrome.tabs.Tab> {
    if (!currentTab) {
        currentTab = await getCurrentTab()
    }
    if (!currentTab) {
        // Current tab not found
        return createTab(url)
    } else {
        const { windowId, index: currentIndex } = currentTab
        return createTab({
            url,
            windowId,
            index: (currentIndex ?? -1) + 1
        })
    }
}

export function createTab(param: chrome.tabs.CreateProperties | string): Promise<chrome.tabs.Tab> {
    const prop: chrome.tabs.CreateProperties = typeof param === 'string' ? { url: param } : param
    if (IS_MV3) {
        return chrome.tabs.create(prop)
    } else {
        return new Promise(resolve => chrome.tabs.create(prop, tab => {
            handleError("getTab")
            resolve(tab)
        }))
    }
}

export function jumpToTab(tabId: number): Promise<chrome.tabs.Tab> {
    const prop: chrome.tabs.UpdateProperties = { active: true }
    if (IS_MV3) {
        return chrome.tabs.update(tabId, prop)
    } else {
        return new Promise(resolve => chrome.tabs.update(tabId, prop, tab => {
            handleError("jumpToTab")
            resolve(tab)
        }))
    }
}