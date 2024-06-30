import React, { useMemo } from "react"
import { useGameContext } from "../context"
import Item from "./Item"
import { GameMetrics } from "@core/metrics"
import { ClickCounter } from "@core/useClickCounter"
import './style.sass'

type Result = {
    bv3: string
    bv3Speed: string
    expectedTime: string
    ioe: string
    rqp: string
    correctness: string
    throughput: string
    openings: number | string
    islands: number | string
}

const DEFAULT_RESULT: Result = {
    expectedTime: "*",
    bv3: "*/*",
    bv3Speed: "*",
    ioe: "*",
    rqp: "*",
    correctness: "*",
    throughput: "*",
    openings: "*",
    islands: "*",
}

const formatClick = (clickCount: number, gameTime: number) => {
    if (!clickCount) return '0@0'
    return `${clickCount}@${(clickCount / gameTime * 1000).toFixed(2)}`
}

const formatTime = (gameTime: number) => {
    const sec = (gameTime ?? 0) / 1000
    return `${sec?.toFixed(2)} (${Math.ceil(sec)})`
}

const calculateResult = (metrics: GameMetrics, time: number, clickCounter: ClickCounter): Result => {
    const { bv3, bv3Total, openings, islands } = metrics || {}
    if (!bv3Total || !time) return DEFAULT_RESULT
    const sec = (time ?? 0) / 1000
    const bv3Speed = bv3 / sec
    const { left = 0, right = 0, double = 0, effective = 0 } = clickCounter || {}
    const totalClick = left + right + double

    return {
        bv3: `${bv3}/${bv3Total}`,
        bv3Speed: bv3Speed.toFixed(2),
        expectedTime: formatTime(time / bv3 * bv3Total),
        ioe: (bv3 / totalClick).toFixed(3),
        rqp: (sec / bv3Speed).toFixed(3),
        correctness: (effective / totalClick).toFixed(3),
        throughput: (bv3 / effective).toFixed(3),
        openings, islands
    }
}

const Scoreboard = () => {
    const { clickCounter, instance } = useGameContext()
    const { gameTime, metrics, flagCount } = instance || {}
    const { left, right, double } = clickCounter || {}
    const {
        expectedTime,
        bv3, bv3Speed,
        ioe, rqp,
        throughput, correctness,
    } = useMemo(() => calculateResult(metrics, gameTime, clickCounter), [metrics])
    return (
        <div className="window" style={{ height: 'fit-content' }}>
            <div className="title-bar">
                <div className="title-bar-text">
                    Counter
                </div>
            </div>
            <div className="scoreboard window-body" style={{ margin: "0px 3px" }}>
                <Item label="RTime" value={formatTime(gameTime)} primary />
                <Item label="Est RTime" value={expectedTime} />
                <Item label="3BV" value={bv3} />
                <Item label="3BV/s" value={bv3Speed} />
                {/* <Item label="ZiNi" />
                <Item label="H.ZiNi" />
                <Item label="Ops" />
                <Item label="IsIs" /> */}
                <Item label="Left" value={formatClick(left, gameTime)} />
                <Item label="Right" value={formatClick(right, gameTime)} />
                <Item label="Double" value={formatClick(double, gameTime)} />
                <Item label="CL" value={formatClick(left + right + double, gameTime)} />
                <Item label="IOE" value={ioe} />
                <Item label="ThrP" value={throughput} />
                <Item label="Corr" value={correctness} />
                {/* <Item label="ZNE" />
                <Item label="HZNE" />
                <Item label="ZNT" />
                <Item label="HZNT" />
                <Item label="Path" /> */}
                <Item label="Flags" value={flagCount ?? 0} />
                <Item label="RQP" value={rqp} />
                {/* <Item label="IOS" value={ios} /> */}
                {/* <Item label="Ranks" />
                <Item label="ios rank" />
                <Item label="rqp rank" /> */}
            </div>
        </div>
    )
}

export default Scoreboard