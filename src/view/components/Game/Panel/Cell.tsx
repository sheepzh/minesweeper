import { Mine } from "@core/useGame"
import { classNames } from "@util/style"
import React from "react"

const SIDE_LEN = 16

type Props = {
    value: Mine
}

const Cell = (props: Props) => {
    const { value } = props
    const { state } = value || {}
    return (
        <div
            className={classNames('mine-cell', value?.state)}
            style={{
                width: SIDE_LEN,
                height: SIDE_LEN,
                borderWidth: state === 'unknown' ? SIDE_LEN / 8 : null,
            }}
        />
    )
}

export default Cell