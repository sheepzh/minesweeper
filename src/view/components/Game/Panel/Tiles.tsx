import { Tile, GameShape } from "@core/common"
import { classNames } from "@util/style"
import React from "react"
import { useGameState } from "../context"

type Props = {
    value: Tile
    onMouseEnter: () => void
    onMouseDown: (e: React.MouseEvent) => void
    onMouseLeave: () => void
}

const BASE_CLZ_NAME = 'tile-cell'

const Cell = (props: Props) => {
    const gameState = useGameState()
    const {
        value: { state, pressing, around, mine } = {},
        onMouseDown, onMouseEnter, onMouseLeave
    } = props

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onMouseDown?.(e)
        e?.preventDefault?.()
    }

    const handleLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const related = e.relatedTarget as HTMLElement
        if (related?.classList?.contains?.(BASE_CLZ_NAME)) return
        onMouseLeave?.()
    }

    return (
        <div
            className={classNames(
                BASE_CLZ_NAME,
                state,
                pressing && 'pressing',
                state === 'open' && around && `open-${around}`,
                gameState === 'dead' && state === 'unknown' && mine && 'uncover',
                gameState === 'dead' && state === 'flag' && !mine && 'wrong-flag',
            )}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={handleLeave}
        />
    )
}

type TilesProps = {
    shape: GameShape
    value: Tile[]
    onMouseDown: (t: Tile, e: React.MouseEvent) => void
    onMouseEnter: (t: Tile) => void
    onMouseLeave: (t: Tile) => void
    onMouseUp: () => void
}

const Tiles = (props: TilesProps) => {
    const { shape: { width } = {}, value, onMouseDown, onMouseEnter, onMouseUp, onMouseLeave } = props

    return (
        <div
            className="tile-grid"
            style={{ gridTemplateColumns: `repeat(${width}, ${100 / width}%)` }}
            onMouseUp={onMouseUp}
        >
            {value?.map((tile, idx) => (
                <Cell
                    key={`mine_${idx}`}
                    value={tile}
                    onMouseDown={e => onMouseDown(tile, e)}
                    onMouseEnter={() => onMouseEnter(tile)}
                    onMouseLeave={() => onMouseLeave(tile)}
                />
            ))}
        </div>
    )
}

export default Tiles