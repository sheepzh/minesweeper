import { IS_EXTENSION } from "@util/env"

/**
 * @since 1.4.4
 */
export const IS_MV3 = IS_EXTENSION && chrome.runtime.getManifest().manifest_version === 3

export function handleError(scene: string) {
    try {
        const lastError = chrome.runtime.lastError
        lastError && console.log(`Errored when ${scene}: ${lastError.message}`)
    } catch (e) {
        console.info("Can't execute here")
    }
}