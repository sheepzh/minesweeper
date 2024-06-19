/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export function classNames(...names: (string | boolean | number)[]): string {
    return names?.filter(n => typeof n === 'string' && n).join(' ')
}