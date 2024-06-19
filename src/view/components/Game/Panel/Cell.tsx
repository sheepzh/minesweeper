import { Mine } from "@core/useGame"
import React, { CSSProperties, useMemo } from "react"

const SIDE_LEN = 24

type Props = {
    value: Mine
}

const computeStyle = (mine: Mine): CSSProperties => {
    const { state } = mine
    const style: CSSProperties = { width: '100%', height: '100%' }
    if (state === 'unknown') {
        style.borderWidth = SIDE_LEN / 12
        style.borderStyle = 'solid'
        style.width = SIDE_LEN
        style.height = SIDE_LEN
        style.borderColor = 'rgb(245, 245, 245) rgb(128, 128, 128) rgb(128, 128, 128) rgb(245, 245, 245)'
    }
    return style
}

const Cell = (props: Props) => {
    const { value } = props
    const style = useMemo(() => computeStyle(value), [value])
    return (
        <div style={style}>

        </div>
    )
}

export default Cell