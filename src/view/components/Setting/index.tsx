import React from "react"
import LocaleSelect from "./LocaleSelect"
import "./style.sass"
import { useLocale } from "@view/useLocale"
import Resolution from "./Resolution"

type Props = {
    onClose: () => void
}

const Setting = (props: Props) => {
    const { onClose } = props
    const { t } = useLocale()

    return (
        <div style={{ position: "absolute", width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="window" style={{ width: 500, height: 'fit-content' }}>
                <div className="title-bar">
                    <div className="title-bar-text">
                        {t(msg => msg.setting.title)}
                    </div>
                    <div className="title-bar-controls">
                        <button aria-label="Close" onClick={onClose} />
                    </div>
                </div>
                <div className="window-body" style={{ height: 200 }}>
                    <div className="action-container">
                        <LocaleSelect />
                        <Resolution />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting