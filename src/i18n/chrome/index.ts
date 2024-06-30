/**
 * Copyright (c) 2021 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * @ts error Can't find namespace timer in this file
 * So import the faked one
 */
import compile from "./compile"
import messages from "../message/market"

const _default: { [locale in ms.Locale]: any } = {
    zh_CN: compile(messages.zh_CN),
    en: compile(messages.en),
}

export default _default