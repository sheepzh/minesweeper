export type GameShape = {
    width: number
    height: number
    mineCount: number
}

export type Position = [
    x: number,
    y: number,
]

export type GameState = 'initial' | 'running' | 'dead' | 'win'

export type TileState = 'unknown' | 'open' | 'flag' | 'boom'

export type Tile = {
    state: TileState
    mine: boolean
    around: number
    pos: Position
    pressing?: boolean
}

export const iterateNeighbor = (shape: GameShape, tiles: Tile[], target: Tile, doSomething: (t: Tile) => void) => {
    const { width, height } = shape || {}
    const { pos: [x, y] } = target
    for (let i = Math.max(0, x - 1); i <= Math.min(width - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(height - 1, y + 1); j++) {
            if (i === x && j === y) continue
            doSomething?.(tiles[j * width + i])
        }
    }
}

export const countNeighbor = (shape: GameShape, tiles: Tile[], target: Tile, predicate: (t: Tile) => boolean): number => {
    const { width, height } = shape || {}
    const { pos: [x, y] } = target
    let count = 0
    for (let i = Math.max(0, x - 1); i <= Math.min(width - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(height - 1, y + 1); j++) {
            if (i === x && j === y) continue
            predicate?.(tiles[j * width + i]) && count++
        }
    }
    return count
}

export const findAnyInNeighbor = (shape: GameShape, tiles: Tile[], target: Tile, predicate: (t: Tile) => boolean): Tile => {
    const { width, height } = shape || {}
    const { pos: [x, y] } = target
    for (let i = Math.max(0, x - 1); i <= Math.min(width - 1, x + 1); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(height - 1, y + 1); j++) {
            if (i === x && j === y) continue
            const tile = tiles[j * width + i]
            if (predicate?.(tile)) return tile
        }
    }
    return null
}