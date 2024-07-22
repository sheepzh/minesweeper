import { Tile } from "@core/common"
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

const TileCell = (props: Props) => {
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

export default TileCell