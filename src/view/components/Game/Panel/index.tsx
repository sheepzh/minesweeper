import React from "react"
import { useGame } from "@core/useGame"
import Cell from "./Cell"

const Panel = () => {
    const { mines, shape } = useGame({ level: 'expert' })
    const { width, height } = shape || {}
    return (
        <div
            style={{
                backgroundColor: '#c0c0c0',
                borderLeft: '3px solid rgb(245, 245, 245)',
                borderTop: '3px solid rgb(245, 245, 245)',
                padding: 5,
            }}
        >
            <div
                style={{
                    height: 34,
                    borderRadius: 1,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: 'rgb(128, 128, 128) rgb(245, 245, 245) rgb(245, 245, 245) rgb(128, 128, 128)',
                    marginBottom: 5,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '3px 7px 3px 4px',
                }}
            >

            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${width}, ${100 / width}%)`,
                    gridTemplateRows: `repeat(${height}, ${100 / height}%)`,
                    borderWidth: 3,
                    borderStyle: 'solid',
                    borderColor: 'rgb(128, 128, 128) rgb(245, 245, 245) rgb(245, 245, 245) rgb(128, 128, 128)',
                    boxSizing: 'border-box',
                }}
            >
                {mines?.map((mine) => (
                    <Cell
                        key={`${mine?.pos?.[0]}_${mine?.pos?.[1]}`}
                        value={mine}
                    />
                ))}
            </div>
        </div>
    )
}
export default Panel