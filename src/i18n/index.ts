export const FEEDBACK_LOCALE: ms.Locale = 'en'

function tryGetOriginalI18nVal<MessageType>(
    messages: ms.Messages<MessageType>,
    keyPath: I18nKey<MessageType>,
    specLocale?: ms.Locale
) {
    try {
        return keyPath(messages[specLocale || FEEDBACK_LOCALE])
    } catch (ignore) {
        return undefined
    }
}

export function getI18nVal<MessageType>(
    messages: ms.Messages<MessageType>,
    keyPath: I18nKey<MessageType>,
    specLocale?: ms.Locale
): string {
    const result = tryGetOriginalI18nVal(messages, keyPath, specLocale)
        || keyPath(messages[FEEDBACK_LOCALE])
        || ''
    return typeof result === 'string' ? result : JSON.stringify(result)
}

export type TranslateProps<MessageType> = {
    key: I18nKey<MessageType>,
    param?: { [key: string]: string | number }
}

function fillWithParam(result: string, param: { [key: string]: string | number }) {
    if (!result) {
        return ''
    }
    Object.entries(param)
        .filter(([_key, value]) => value !== null && value !== undefined)
        .forEach(([key, value]) => result = result.replace(`{${key}}`, value.toString()))
    return result
}

export function t<MessageType>(messages: ms.Messages<MessageType>, props: TranslateProps<MessageType>, specLocale?: ms.Locale): string {
    const { key, param } = props
    const result: string = getI18nVal(messages, key, specLocale)
    return param ? fillWithParam(result, param) : result
}

export type I18nKey<MessageType> = (messages: MessageType | EmbeddedPartial<MessageType>) => any
