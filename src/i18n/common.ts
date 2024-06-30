const ALL_LOCALE_VALIDATOR: { [locale in ms.Locale]: 0 } = {
    zh_CN: 0,
    en: 0,
}

export const ALL_LOCALES: ms.Locale[] = Object.keys(ALL_LOCALE_VALIDATOR) as ms.Locale[]