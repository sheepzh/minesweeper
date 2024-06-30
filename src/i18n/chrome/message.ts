/**
 * Copyright (c) 2021-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { MarketMessage } from "@i18n/message/market"

const placeholder: MarketMessage = {
    name: "",
    marketName: "",
    description: ""
}

function routerPath(root: any, parentPath = '') {
    Object.entries(root)
        .forEach(([key, value]) => {
            const currentPath = parentPath ? `${parentPath}_${key}` : key
            if (typeof value === 'string') {
                root[key] = currentPath
            } else {
                root[key] = routerPath(value, currentPath)
            }
        })
    return root
}

export const router: MarketMessage = routerPath(placeholder) as unknown as MarketMessage
