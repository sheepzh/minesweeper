import { findAnyInNeighbor, GameShape, iterateNeighbor, Tile } from "./common"

export type GameMetrics = {
    bv3: number
    bv3Total: number
    openings: number
    islands: number
}

/**
 * Calculate 3bv
 */
const calculateBv3 = (tiles: Tile[], shape: GameShape): [finished: number, total: number] => {
    let total = 1
    let finished = 1
    tiles.forEach(tile => {
        const { around, mine, state } = tile
        if (!around || mine) return
        const hasEmpty = findAnyInNeighbor(shape, tiles, tile, t => !t.mine && !t.around)
        if (hasEmpty) return
        total++
        state === 'open' && finished++
    })
    return [finished, total]
}

const zeroLand = (landMatrix: boolean[], idx: number, shape: GameShape): void => {
    const { width, height } = shape
    const stack = [idx]
    
    while (stack.length > 0) {
        const current = stack.pop()
        if (!landMatrix[current]) continue
        
        landMatrix[current] = false
        const x = current % width
        const y = Math.floor(current / width)
        
        if (x > 0) stack.push(current - 1)
        if (x < width - 1) stack.push(current + 1)
        if (y > 0) stack.push(current - width)
        if (y < height - 1) stack.push(current + width)
    }
}

const dfsIslands = (landMatrix: boolean[], shape: GameShape): number => {
    let islands = 0
    while (true) {
        const idx = landMatrix.findIndex(v => v)
        if (idx < 0) break
        zeroLand(landMatrix, idx, shape)
        islands++
    }
    return islands
}

export const calculateMetrics = (tiles: Tile[], shape: GameShape): GameMetrics => {
    const [bv3, bv3Total] = calculateBv3(tiles, shape)
    const openings = dfsIslands(tiles.map(t => !t.around && !t.mine), shape)
    const islands = dfsIslands(tiles.map(t => t.mine), shape)
    return {
        bv3,
        bv3Total,
        openings,
        islands,
    }
}
