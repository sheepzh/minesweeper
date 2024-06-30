export const IS_EXTENSION = !!chrome?.runtime?.id

declare global {
    interface Window {
        _IS_DEV_?: boolean
    }
}

export const IS_DEV = !IS_EXTENSION && !!window._IS_DEV_
