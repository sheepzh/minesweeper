import { fillWith, repeat } from "@util/array"
import { useCounter } from "ahooks"
import { RefObject, useMemo, useRef, useState } from "react"
import { countNeighbor, GameShape, GameState, iterateNeighbor, Position, Tile } from "./common"
import { calculateMetrics, GameMetrics } from "./metrics"

export type ResetCmd = {
    setting?: ms.game.Setting
    cheating?: boolean
}

export type GameInstance = {
    shape: RefObject<GameShape>
    tiles: Tile[]
    state: GameState
    metrics: GameMetrics
    flagCount: number
    cheatingEnable: boolean
    resetGame: (cmd?: ResetCmd) => void
    openTile: (tile: Tile) => boolean
    openTiles: (tile: Tile) => boolean
    clearPressing: () => void
    pressTile: (tile: Tile) => void
    pressTiles: (tile: Tile) => void
    changeFlag: (tile: Tile) => void
}

const computeShape = (setting: ms.game.Setting): GameShape => {
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

const resetPosition = (shape: GameShape, tiles: Tile[], firstClickPos: Position): Tile[] => {
    const { width, height, mineCount } = shape || {}
    const [x, y] = firstClickPos || []
    const clickIdx = y * width + x
    const length = width * height

    // Fill tiles
    repeat(mineCount, () => {
        while (true) {
            const mineIdx = Math.floor(Math.random() * length)
            if (mineIdx === clickIdx || tiles[mineIdx].mine) continue
            tiles[mineIdx].mine = true
            break
        }
    })

    // Count around
    tiles.forEach(tile => {
        const count = countNeighbor(shape, tiles, tile, t => t.mine)
        tile.around = count
    })
    return tiles
}

const computeSweepCount = (shape: GameShape) => {
    const { width, height, mineCount } = shape || {}
    return (width ?? 0) * (height ?? 0) - (mineCount ?? 0)
}

export const useGame = (): GameInstance => {
    const setting = useRef<ms.game.Setting>()
    const shape = useRef<GameShape>()
    const needSweepCount = useMemo(() => computeSweepCount(shape.current), [shape.current])
    const [cheatingEnable, setCheatingEnable] = useState(false)
    const [tiles, setTiles] = useState<Tile[]>([])
    const [state, setState] = useState<GameState>()
    const [
        flagCount,
        { inc: increaseFlag, dec: decreaseFlag, reset: resetFlag },
    ] = useCounter(0)
    const [metrics, setMetrics] = useState<GameMetrics>()

    const resetGame = (cmd?: ResetCmd) => {
        const { setting: newSetting, cheating } = cmd || {}
        let settingVal = setting.current
        let shapeVal = shape.current
        if (newSetting) {
            settingVal = setting.current = newSetting
            shapeVal = shape.current = computeShape(newSetting)
        }
        if (!settingVal || !shapeVal) {
            return
        }

        if (cheating) {
            // todo 
        }
        resetFlag()
        setState('initial')
        setMetrics(null)

        let tiles: Tile[] = []
        const { width, height } = shapeVal
        const length = width * height
        tiles = fillWith(length, idx => {
            const x = idx % width
            const y = Math.floor(idx / width)
            return { state: 'unknown', mine: false, around: 0, pos: [x, y] }
        })
        setTiles(tiles)
    }

    const startGame = (firstClickPos?: Position) => {
        resetPosition(shape.current, tiles, firstClickPos)
        setState('running')
    }

    const doOpen = (tile: Tile) => {
        if (tile.state === 'open' || tile.state === 'flag') return
        tile.state = 'open'
        !tile.around && iterateNeighbor(shape.current, tiles, tile, doOpen)
    }

    const endGame = (state: GameState & ('win' | 'dead')) => {
        const metrics = calculateMetrics(tiles, shape.current)
        setMetrics(metrics)
        setState(state)
        setCheatingEnable(true)
    }

    const checkWin = () => {
        const openCount = tiles.filter(t => t.state === 'open')?.length ?? 0
        openCount === needSweepCount && endGame('win')
    }

    const openTile = (tile: Tile): boolean => {
        if (state !== 'initial' && state !== 'running') return false
        clearPressing()
        state === 'initial' && startGame(tile.pos)
        if (tile.state !== 'unknown') return false
        if (tile.mine) {
            tile.state = 'boom'
            endGame('dead')
            return false
        } else {
            doOpen(tile)
            checkWin()
            return true
        }
    }

    const openTiles = (tile: Tile): boolean => {
        if (state !== 'initial' && state !== 'running') return false
        clearPressing()
        const flagCount = countNeighbor(shape.current, tiles, tile, t => t.state === 'flag')
        if (flagCount !== tile.around) return false
        let effective = false
        iterateNeighbor(shape.current, tiles, tile, t => effective = openTile(t) || effective)
        return effective
    }

    const changeFlag = (tile: Tile) => {
        if (state !== 'running' || setting.current?.forceNf) return
        clearPressing()
        if (tile.state === 'unknown') {
            tile.state = 'flag'
            increaseFlag()
        } else if (tile.state === 'flag') {
            tile.state = 'unknown'
            decreaseFlag()
        }
    }

    const clearPressing = () => {
        tiles.filter(t => t.pressing).forEach(t => t.pressing = false)
    }

    const pressTile = (tile: Tile) => {
        if (state !== 'running') return
        clearPressing()
        tile.pressing = true
    }

    const pressTiles = (tile: Tile) => {
        if (state !== 'running') return
        pressTile(tile)
        iterateNeighbor(shape.current, tiles, tile, t => t.pressing = true)
    }

    return {
        shape,
        tiles,
        state,
        metrics,
        flagCount,
        cheatingEnable,
        resetGame,
        openTile,
        openTiles,
        clearPressing,
        pressTile,
        pressTiles,
        changeFlag,
    }
}
