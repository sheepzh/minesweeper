import { useRef, useState } from "react"

export type CounterInstance = {
    time: number
}

export const useCounter = () => {
    const [time, setTime] = useState<number>()
    const startTime = useRef<number>()
    const timer = useRef<NodeJS.Timer>()

    const start = () => {
        setTime(0)
        startTime.current = Date.now()
        timer.current = setInterval(() => {
            const newTime = Date.now() - startTime.current
            setTime(newTime)
        })
    }

    const end = (makeZero?: boolean) => {
        clearInterval(timer.current)
        makeZero && setTime(0)
    }

    return {
        start, end, time
    }
}