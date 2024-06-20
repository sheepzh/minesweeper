import { GameState, Mine, Position } from "@core/useGame"
import { classNames } from "@util/style"
import React from "react"

const SIDE_LEN = 16

type Props = {
    value: Mine
    gameState: GameState
    pressingPos: Position
    onPressing?: () => void
    onOpen?: () => void
    onFlag?: () => void
}

const isSamePos = (a: Position, b: Position): boolean => {
    return a?.[0] === b?.[0] && a?.[1] === b?.[1]
}

const Cell = (props: Props) => {
    const { value, gameState, pressingPos, onPressing, onOpen } = props
    const { state } = value || {}
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) {
            // Left click
            !isSamePos(pressingPos, value?.pos) && onPressing?.()
        }
    }
    const handleMouseUp = (e: React.MouseEvent) => {
        if (e.button === 0) {
            onOpen?.()
        }
    }
    const handleMouseEnter = (e: React.MouseEvent) => {
        if (e.button === 0 && pressingPos) {
            onPressing?.()
        }
    }
    return (
        <div
            className={classNames(
                'mine-cell',
                value?.state,
                isSamePos(pressingPos, value?.pos) && 'pressing',
                value.state === 'open' && value.around && `open-${value.around}`,
                gameState === 'dead' && value.state === 'unknown' && value.mine && 'uncover',
                gameState === 'dead' && value.state === 'flag' && !value.mine && 'wrong-flag',
            )}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            style={{
                width: SIDE_LEN,
                height: SIDE_LEN,
                borderWidth: state === 'unknown' ? SIDE_LEN / 8 : null,
            }}
            aria-details={`${value?.mine}`}
        />
    )
}

export default Cell