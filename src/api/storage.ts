import { get, set, remove } from "@ext/chrome/storage"
import { IS_EXTENSION } from "@util/env"

export const KEY_PREFIX = '_ms_'

export type Storage = {
    get: <T> (key: string) => Promise<T>
    put: <T> (key: string, val: T) => Promise<void>
    delete: (key: string) => Promise<void>
}

const LOCAL_STORAGE_ADAPTOR: Storage = {
    get: async function (key: string) {
        const str = localStorage?.getItem(key)
        if (!str) return undefined
        try {
            return JSON.parse(str)
        } catch (e) {
            console.warn("Invalid storage value: " + str)
        }
    },
    put: async function <T>(key: string, val: T): Promise<void> {
        const str = val ? JSON.stringify(val) : ''
        localStorage?.setItem(key, str)
    },
    delete: async function (key: string): Promise<void> {
        localStorage?.removeItem(key)
    },
}

const EXTENSION_STORAGE_ADAPTOR: Storage = {
    get,
    put: set,
    delete: remove,
}

export default IS_EXTENSION ? EXTENSION_STORAGE_ADAPTOR : LOCAL_STORAGE_ADAPTOR