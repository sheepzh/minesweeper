import { ClickCounter, useClickCounter } from "@core/useClickCounter"
import { GameInstance, ResetCmd, useGame } from "@core/useGame"
import { useMount } from "ahooks"
import { createContext, useContext } from "react"

export type GameContextInfo = {
    instance: GameInstance
    clickCounter: ClickCounter
    reset: (cmd?: ResetCmd) => void
}

export const GameContext = createContext<GameContextInfo>(null)

export const useGameContextProvider = () => {
    const instance = useGame()
    const clickCounter = useClickCounter()
    const reset = (cmd?: ResetCmd) => {
        instance.resetGame(cmd)
        clickCounter.reset()
    }
    return {
        instance, clickCounter, reset
    }
}

export const useGameState = () => useContext(GameContext)?.instance?.state

export const useGameContext = () => useContext(GameContext)