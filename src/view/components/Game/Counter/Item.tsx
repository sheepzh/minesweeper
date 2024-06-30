import { classNames } from "@util/style"
import React from "react"

type Props = {
    label: string
    value?: string | number
    primary?: boolean
}

const Item = (props: Props) => {
    const { label, value, primary } = props
    return (
        <div className={classNames('score-item', primary && 'primary')}>
            <div className="score-label">
                {label}
            </div>
            <div className="score-value">
                {value ?? ''}
            </div>
        </div>
    )
}

export default Item