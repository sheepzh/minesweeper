import { useCounter } from "ahooks"

export type ClickAction = 'left' | 'right' | 'double'

export type ClickCounter = {
    reset: () => void
    increaseClick: (action: ClickAction) => void
    increaseEffective: () => void
    left: number
    right: number
    double: number
    effective: number
}

export const useClickCounter = (): ClickCounter => {
    const [left, { inc: incLeftClick, reset: resetLeftClick }] = useCounter(0)
    const [right, { inc: incRightClick, reset: resetRightClick }] = useCounter(0)
    const [double, { inc: incDoubleClick, reset: resetDoubleClick }] = useCounter(0)
    const [effective, { inc: increaseEffective, reset: resetEffective }] = useCounter(0)

    const reset = () => {
        resetLeftClick()
        resetRightClick()
        resetDoubleClick()
        resetEffective()
    }

    const increaseClick = (action: ClickAction) => {
        if (action === 'left') {
            incLeftClick()
        } else if (action === 'right') {
            incRightClick()
        } else if (action === 'double') {
            incDoubleClick()
        }
    }
    return {
        left, right, double, effective,
        increaseClick, increaseEffective, reset,
    }
}