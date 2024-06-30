import { classNames } from "@util/style"
import React, { useEffect, useMemo, useState } from "react"
import { useGameState } from "../context"

const calculateDigits = (value: number): [number | '-', number, number] => {
    if (value >= 999) return [9, 9, 9]
    if (value < 0) {
        if (value <= -99) return ['-', 9, 9]
        value = -value
        const b = Math.floor(value / 10)
        const c = value % 10
        return ['-', b, c]
    }
    const a = Math.floor(value / 100)
    const b = Math.floor((value - a * 100) / 10)
    const c = Math.ceil(value - a * 100 - b * 10)
    return [a, b, c]
}

const DigitCard = (props: { value: number }) => {
    let { value = 0 } = props
    value = Math.ceil(value)
    const digits = useMemo(() => calculateDigits(value), [value])
    return (
        <div className="digit-outer">
            {digits.map((d, i) => (
                <div key={`digit-${i}`} className={classNames('digit-item', `digit-${d}`)} />
            ))}
        </div>
    )
}

const Emoji = (props: { barPressing: boolean, tilePressing: boolean }) => {
    const { barPressing, tilePressing } = props
    const gameState = useGameState()
    return (
        <div className="emoji-outer">
            <div
                className={classNames(
                    "emoji",
                    gameState,
                    tilePressing && 'tile-pressing',
                    barPressing && 'bar-pressing',
                )}
            />
        </div>
    )
}

type Props = {
    time: number
    leftFlag: number
    tilePressing: boolean
    onReset?: () => void
}

const Bar = (props: Props) => {
    const [barPressing, setBarPressing] = useState(false)
    const { time = 0, leftFlag, onReset, tilePressing } = props
    useEffect(() => {
        !barPressing && onReset?.()
    }, [barPressing])
    return (
        <div
            className="tile-bar"
            onClick={onReset}
            onMouseDown={ev => ev.button === 0 && setBarPressing(true)}
            onMouseUp={ev => ev.button === 0 && setBarPressing(false)}
            onMouseOut={ev => ev.button === 0 && setBarPressing(false)}
        >
            <DigitCard value={leftFlag} />
            <Emoji barPressing={barPressing} tilePressing={tilePressing} />
            <DigitCard value={time / 1000} />
        </div>
    )
}
export default Bar