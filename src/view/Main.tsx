import React from "react"
import Setting from "./components/Setting"
import Game from "./components/Game"
import { OptionContext, useOptionProvider } from "./useOption"

const Main = () => {
    const optionContext = useOptionProvider()
    const { visible, setVisible } = optionContext
    return (
        <OptionContext.Provider value={optionContext}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 50 }}>
                <Game />
                {visible && <Setting onClose={() => setVisible(false)} />}
            </div>
        </OptionContext.Provider>
    )
}

export default Main