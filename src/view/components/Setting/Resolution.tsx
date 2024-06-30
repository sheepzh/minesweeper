import { useOption } from "@view/useOption"
import { useLocale } from "@view/useLocale"
import React from "react"

const Resolution = () => {
    const { t } = useLocale()
    const { option, setResolution } = useOption()

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = ev.target?.value
        const newVal = parseInt(inputVal)
        setResolution(newVal)
    }

    return (
        <div className="field-row">
            <label>{t(msg => msg.setting.label.resolution)}:&emsp;</label>
            <label>{t(msg => msg.setting.resolution.low)}</label>
            <input
                type="range"
                min="0" max="10"
                value={option.resolution}
                style={{ width: 100 }}
                onChange={handleChange}
            />
            <label>{t(msg => msg.setting.resolution.high)}</label>
        </div>
    )
}

export default Resolution