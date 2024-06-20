import { classNames } from "@util/style"
import React from "react"

const calculateDigits = (value: number): [number | '-', number, number] => {
    if (value >= 999) return [9, 9, 9]
    if (value < 0) {
        if (value <= -99) return ['-', 9, 9]
        const b = Math.ceil(value / 10)
        const c = Math.ceil(value % 10)
        return ['-', b, c]
    }
    const a = Math.floor(value / 100)
    const b = Math.floor((value - a * 100) / 10)
    const c = Math.ceil(value - a * 100 - b * 10)
    return [a, b, c]
}

const DigitCard = (props: { value: number }) => {
    const { value = 0 } = props
    const digits = calculateDigits(value)
    return (
        <div className="digit-outer">
            {digits.map(d => (
                <div className={classNames('digit-item', `digit-${d}`)} />
            ))}
        </div>
    )
}

type Props = {
    time: number
    flag: number
    onReset?: () => void
}

const Bar = (props: Props) => {
    const { time = 0, flag, onReset } = props
    return (
        <div className="mine-bar" onClick={onReset}>
            <DigitCard value={flag} />
            <DigitCard value={time / 1000} />
        </div>
    )
}
export default Bar