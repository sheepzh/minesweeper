import { ALL_LOCALES } from "../common"
import localeMessages, { LocaleMessage } from "./locale"
import menuMessages, { MenuMessage } from "./menu"
import marketMessages, { MarketMessage } from "./market"
import settingMessages, { SettingMessage } from "./setting"
import gameMessages, { GameMessage } from "./game"

export type Message = {
    menu: MenuMessage
    market: MarketMessage
    locale: LocaleMessage
    setting: SettingMessage
    game: GameMessage
}

const MESSAGE_ROOT: MessageRoot<Message> = {
    menu: menuMessages,
    market: marketMessages,
    locale: localeMessages,
    setting: settingMessages,
    game: gameMessages,
}

type MessageRoot<T = any> = { [key in keyof T]: ms.Messages<T[key]> }

function merge<T>(messageRoot: MessageRoot<T>): Required<ms.Messages<T>> {
    const result = {}
    ALL_LOCALES.forEach(locale => {
        const message = messageOfRoot(locale, messageRoot)
        result[locale] = message as T & EmbeddedPartial<T>
    })
    return result as Required<ms.Messages<T>>
}

function messageOfRoot<T>(locale: ms.Locale, messageRoot: MessageRoot<T>): T {
    const entries: [string, any][] = Object.entries(messageRoot).map(([key, val]) => ([key, val[locale]]))
    const result = Object.fromEntries(entries) as T
    return result
}

const _default = merge<Message>(MESSAGE_ROOT)

export default _default