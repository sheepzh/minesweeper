const UI_LANGUAGE_MAP: { [uiLang: string]: ms.Locale } = {
    'zh-CN': "zh_CN",
    'en': 'en',
}

export function getLanguage(): ms.Locale {
    const language = chrome.i18n.getUILanguage?.()
    return UI_LANGUAGE_MAP[language]
}