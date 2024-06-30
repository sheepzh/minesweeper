import { handleError, IS_MV3 } from "./common"

export async function get<T>(key: string): Promise<T> {
    if (IS_MV3) {
        const val = await chrome.storage.local.get(key)
        return val?.[key]
    } else {
        return new Promise(resolve => chrome.storage.local.get(key, val => {
            handleError("get")
            resolve(val?.[key])
        }))
    }
}

export function set<T>(key: string, val: T): Promise<void> {
    const param = { [key]: val }
    if (IS_MV3) {
        return chrome.storage.local.set(param)
    } else {
        return new Promise(resolve => chrome.storage.local.set(param, () => {
            handleError("put")
            resolve()
        }))
    }
}

export function remove(key: string): Promise<void> {
    if (IS_MV3) {
        return chrome.storage.local.remove(key)
    } else {
        return new Promise(resolve => chrome.storage.local.remove(key, () => {
            handleError("remove")
            resolve()
        }))
    }
}