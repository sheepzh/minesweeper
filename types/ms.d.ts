declare namespace ms {
    /**
    * The source locale
    */
    type SourceLocale = 'en'
    /**
     * The locale must be translated with code
     */
    type RequiredLocale = SourceLocale | 'zh_CN'
    type OptionalLocale = never
    type Locale = RequiredLocale | OptionalLocale
    type TranslatingLocale = never

    type RequiredMessages<M> = {
        [locale in ms.RequiredLocale]: M
    }

    type OptionalMessages<M> = {
        [locale in ms.OptionalLocale]?: EmbeddedPartial<M>
    }
    type Messages<M> = RequiredMessages<M> & OptionalMessages<M>

    type Level = 'beginner' | 'intermediate' | 'expert'

    type Option = game.Setting & {
        locale?: ms.Locale
    }

    declare module game {
        type Setting = {
            level?: Level
            forceNf?: boolean
            resolution?: number
        }
    }
}