import { fillWith, repeat } from "@util/array"
import { useMount } from "ahooks"
import { useEffect, useMemo, useState } from "react"

export type GameSetting = {
    level: ms.Level
    forceNf?: boolean
}

export type GameShape = {
    width: number
    height: number
    mineCount: number
}

export type Position = [
    x: number,
    y: number,
]

export type GameState = 'initial' | 'running' | 'dead'

export type Mine = {
    state: 'unknown' | 'open' | 'flag' | 'boom'
    mine: boolean
    around: number
    pos: Position
}

export type GameInstance = {
    shape: GameShape
    mines: Mine[]
    state: GameState
    startTime: number
    startGame: () => void
    resetGame: () => void
    changeSetting: (setting?: GameSetting) => void
}

const computeShape = (setting: GameSetting): GameShape => {
    const { level = 'beginner' } = setting || {}
    if (level === 'beginner') {
        return { width: 9, height: 9, mineCount: 10 }
    } else if (level === 'intermediate') {
        return { width: 16, height: 16, mineCount: 40 }
    } else if (level === 'expert') {
        return { width: 30, height: 16, mineCount: 99 }
    } else {
        throw new Error("Invalid settings")
    }
}

const resetPosition = (shape: GameShape, mines: Mine[], firstClickPos: Position): Mine[] => {
    const { width, height, mineCount } = shape || {}
    const [x, y] = firstClickPos || []
    const clickIdx = x * width + y
    const length = width * height

    // Fill mines
    repeat(mineCount, () => {
        while (true) {
            const mineIdx = Math.floor(Math.random() * length)
            if (mineIdx === clickIdx || mines[mineIdx].mine) continue
            mines[mineIdx].mine = true
            break
        }
    })
    // Calculate around
    mines.forEach(mine => {
        const { pos: [x, y] } = mine
        let count = 0
        for (let i = Math.max(0, x - 1); i++; i <= Math.min(width - 1, x + 1)) {
            for (let j = Math.max(0, y - 1); j++; j <= Math.min(height - 1, y + 1)) {
                if (i === x && j === y) continue
                mines[i * width + j]?.mine && count++
            }
        }
        mine.around = count
    })
    return mines
}

export const useGame = (setting: GameSetting): GameInstance => {
    const [$setting, setSetting] = useState(setting)
    const shape = useMemo(() => computeShape($setting), [$setting])
    const [mines, setMines] = useState([])
    const [state, setState] = useState<GameState>()
    const [startTime, setStartTime] = useState<number>()

    const resetGame = () => {
        let mines: Mine[] = []
        if (shape) {
            const { width, height } = shape
            const length = width * height
            mines = fillWith(length, idx => {
                const x = idx % width
                const y = Math.floor(idx / width)
                return { state: 'unknown', mine: false, around: 0, pos: [x, y] }
            })
        }
        setMines(mines)
        setState('initial')
        setStartTime(null)
    }

    useEffect(resetGame, [$setting])
    useMount(resetGame)

    const startGame = (firstClickPos?: Position) => {
        resetPosition(shape, mines, firstClickPos)
        setState('running')
        setStartTime(Date.now())
    }

    return {
        shape,
        mines,
        state,
        startTime,
        startGame,
        resetGame,
        changeSetting: setSetting,
    }
}

