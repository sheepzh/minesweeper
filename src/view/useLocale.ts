import gameMessages, { Message } from "@i18n/message"
import { FEEDBACK_LOCALE, t as t_ } from "@i18n/index"
import { useMemo } from "react"
import { getLanguage } from "@ext/chrome/locale"
import { IS_EXTENSION } from "@util/env"
import { useOption } from "./useOption"

export const useLocale = () => {
    const { option, setLocale } = useOption()

    const locale = useMemo(() => {
        let locale = option?.locale
        !locale && IS_EXTENSION && (locale = getLanguage())
        return locale || FEEDBACK_LOCALE
    }, [option?.locale])

    const t = (key: (msg: Message) => string, param?: any): string => t_(gameMessages, { key, param }, locale)
    const getName = (locale?: ms.Locale) => t_(gameMessages, { key: m => m.locale.name }, locale)

    return { locale, setLocale, t, getName }
}