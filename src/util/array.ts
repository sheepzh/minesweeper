export const fillWith = <T,>(length: number, supplier: (idx: number) => T) => {
    return Array.from(Array(length)).map((_, idx) => supplier?.(idx))
}

export const repeat = (time: number, doSomething: () => void) => {
    return Array.from(Array(time)).forEach(doSomething)
}