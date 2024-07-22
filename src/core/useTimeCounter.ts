import { useRef, useState } from "react"

export type TimeCounter = {
    start: () => void
    end: () => void
    reset: () => void
    time: number
}

export const useTimeCounter = (): TimeCounter => {
    const [time, setTime] = useState<number>()
    const startTime = useRef<number>()
    const timer = useRef<NodeJS.Timeout>()

    const start = () => {
        if (timer.current) return

        setTime(0)
        startTime.current = Date.now()
        timer.current = setInterval(() => {
            const newTime = Date.now() - startTime.current
            setTime(newTime)
        })
    }

    const end = () => {
        if (!timer.current) return
        clearInterval(timer.current)
        timer.current = null
    }

    const reset = () => {
        end()
        setTime(0)
    }

    return {
        start, end, reset, time,
    }
}