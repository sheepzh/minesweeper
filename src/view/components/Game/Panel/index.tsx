import React, { useState } from "react"
import { Mine, Position, useGame } from "@core/useGame"
import Cell from "./Cell"
import "./style.sass"
import Bar from "./Bar"
import { classNames } from "@util/style"

const Panel = () => {
    const { mines, shape, clickMine, gameTime, resetGame, state } = useGame({ level: 'expert' })
    const { width } = shape || {}
    const [pressingPos, setPressingPos] = useState<Position>()

    const handleOpen = (mine: Mine) => {
        setPressingPos(null)
        clickMine(mine)
    }
    return (
        <div className={classNames('game-root', state)}>
            <Bar time={gameTime} flag={0} onReset={resetGame} />
            <div
                className="mine-grid"
                style={{ gridTemplateColumns: `repeat(${width}, ${100 / width}%)` }}
            >
                {mines?.map((mine, idx) => (
                    <Cell
                        gameState={state}
                        pressingPos={pressingPos}
                        key={`mine_${idx}`}
                        value={mine}
                        onPressing={() => setPressingPos(mine?.pos)}
                        onOpen={() => handleOpen(mine)}
                    />
                ))}
            </div>
        </div>
    )
}
export default Panel