import React, { useEffect, useState } from "react"
import { Tile } from "@core/common"
import Bar from "./Bar"
import { useGameContext } from "../context"
import { ClickAction } from "@core/useClickCounter"
import "./style.sass"
import Menu from "./Menu"
import { useLocale } from "@view/useLocale"
import { useOption } from "@view/useOption"
import TileCell from "./TileCell"

type Action = {
    target: Tile
    click: ClickAction
}

const calcZoom = (resolution: number = 0): number => {
    const res = Math.min(Math.max(0, resolution), 10)
    return Math.sqrt(0.525 * res + 1)
}


const Panel = () => {
    const { instance, clickCounter, timeCounter, reset } = useGameContext()
    const { time: gameTime } = timeCounter || {}
    const {
        tiles, shape, state, flagCount,
        openTile, openTiles,
        pressTile, pressTiles, clearPressing,
        changeFlag,
    } = instance
    const { increaseClick, increaseEffective } = clickCounter
    const [action, setAction] = useState<Action>({ target: null, click: null })

    useEffect(() => {
        const { target, click } = action || {}
        if (!click) {
            clearPressing()
        } else if (click === 'left') {
            pressTile(target)
        } else if (click === 'double') {
            pressTiles(target)
        }
    }, [action.target, action.click])

    const onTilesMouseDown = (tile: Tile, e: React.MouseEvent) => {
        if (e.button === 2 && e.buttons === 2 && tile) {
            // Right click
            setAction({ target: tile, click: 'right' })
        } else if (e.button === 0 && e.buttons === 1) {
            // Left click
            setAction({ target: tile, click: 'left' })
        } else if (e.buttons === 3 && state === 'running') {
            // Double click only effective when running
            setAction({ target: tile, click: 'double' })
        }
    }

    useEffect(() => {
        state === 'dead' && timeCounter.end()
    }, [state])

    function onTilesMouseUp() {
        const { target, click } = action || {}
        if (!click || !target) return
        if (state !== 'initial' && state !== 'running') return
        if (state === 'running' || (state === 'initial' && click === 'left')) {
            increaseClick(click)
        }
        let effective = false
        if (click === 'left') {
            timeCounter.start()
            effective = openTile(target)
        } else if (click === 'double') {
            effective = openTiles(target)
        } else if (click === 'right') {
            changeFlag(target)
        }
        effective && increaseEffective()
        setAction({ click: null, target: null })
    }

    const onTilesMouseEnter = (tile: Tile) => setAction({ target: tile, click: action?.click })
    const onTilesMouseLeave = () => setAction({ click: null, target: null })
    const { t } = useLocale()
    const { option } = useOption()

    return (
        <div className="window" style={{ height: 'fit-content' }}>
            <div className="title-bar">
                <div className="title-bar-text">
                    {t(m => m.market.name)}
                </div>
            </div>
            <div className="window-body" style={{ margin: 3, marginBottom: 0, marginTop: 0 }}>
                <Menu />
                <div
                    className='game-area'
                    style={{ zoom: calcZoom(option?.resolution) }}
                    onContextMenu={e => e.preventDefault()}
                >
                    <Bar
                        time={gameTime}
                        leftFlag={(shape.current?.mineCount ?? 0) - (flagCount ?? 0)}
                        tilePressing={!!action?.click}
                        onReset={reset}
                    />
                    <div
                        className="tile-grid"
                        style={{ gridTemplateColumns: `repeat(${shape.current?.width}, ${100 / shape.current?.width}%)` }}
                        onMouseUp={onTilesMouseUp}
                    >
                        {tiles?.map((tile, idx) => (
                            <TileCell
                                key={`mine_${idx}`}
                                value={tile}
                                onMouseDown={e => onTilesMouseDown(tile, e)}
                                onMouseEnter={() => onTilesMouseEnter(tile)}
                                onMouseLeave={() => onTilesMouseLeave()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Panel