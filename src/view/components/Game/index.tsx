import React, { useEffect } from "react"
import Panel from "./Panel"
import Counter from "./Counter"
import { GameContext, GameContextInfo, useGameContextProvider } from "./context"
import { OptionContextInfo, useOption } from "@view/useOption"

const useKeyboardListener = (context: GameContextInfo, optionContext: OptionContextInfo) => {
    const { toggleVisible, setLevel } = optionContext
    const handler = (ev: KeyboardEvent) => {
        const key = ev.key
        let processed = true
        if (key === 'F2') {
            context.reset()
        } else if (key === 'F3') {
            context.reset({ cheating: true })
        } else if (key === 'F5') {
            toggleVisible()
        } else if (key === '1') {
            setLevel('beginner')
        } else if (key === '2') {
            setLevel('intermediate')
        } else if (key === '3') {
            setLevel('expert')
        } else {
            processed = false
        }
        processed && ev.preventDefault()
    }

    useEffect(() => {
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])
}

const Game = () => {
    const context = useGameContextProvider()
    const optionContext = useOption()
    const { option } = optionContext
    useEffect(() => context.reset({ setting: option }), [option?.level])
    useKeyboardListener(context, optionContext)

    return (
        <GameContext.Provider value={context}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
                <Panel />
                <Counter />
            </div>
        </GameContext.Provider>
    )
}

export default Game