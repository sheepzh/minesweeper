import { ClickCounter, useClickCounter } from "@core/useClickCounter"
import { GameInstance, ResetCmd, useGame } from "@core/useGame"
import { TimeCounter, useTimeCounter } from "@core/useTimeCounter"
import { createContext, useContext } from "react"

export type GameContextInfo = {
    instance: GameInstance
    timeCounter: TimeCounter
    clickCounter: ClickCounter
    reset: (cmd?: ResetCmd) => void
}

export const GameContext = createContext<GameContextInfo>(null)

export const useGameContextProvider = () => {
    const instance = useGame()
    const clickCounter = useClickCounter()
    const timeCounter = useTimeCounter()
    const reset = (cmd?: ResetCmd) => {
        instance.resetGame(cmd)
        timeCounter.reset()
        clickCounter.reset()
    }
    return {
        instance, clickCounter, timeCounter, reset
    }
}

export const useGameState = () => useContext(GameContext)?.instance?.state

export const useGameContext = () => useContext(GameContext)