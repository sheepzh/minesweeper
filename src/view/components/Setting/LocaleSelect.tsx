import { ALL_LOCALES } from "@i18n/common"
import { useLocale } from "@view/useLocale"
import React from "react"

const LocaleSelect = () => {
    const { t, locale, setLocale, getName } = useLocale()
    const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = ev?.target?.selectedOptions?.[0]?.value as ms.Locale
        setLocale(newLocale)
    }

    return (
        <div className="field-row">
            <label>
                {t(msg => msg.setting.label.language)}:&emsp;
            </label>
            <select onChange={handleChange} value={locale}>
                {ALL_LOCALES.map(l => (
                    <option value={l} key={l}>
                        {getName(l)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default LocaleSelect