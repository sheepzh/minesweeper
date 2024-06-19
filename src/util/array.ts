export const fillWith = <T,>(length: number, supplier: (idx: number) => T) => {
    return [...Array(length).keys()].map(idx => supplier?.(idx))
}

export const repeat = (time: number, doSomething: () => void) => {
    return Array(time).forEach(doSomething)
}