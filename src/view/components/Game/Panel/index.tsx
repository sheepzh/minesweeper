import React from "react"
import { useGame } from "@core/useGame"
import Cell from "./Cell"
import "./style.css"

const Panel = () => {
    const { mines, shape } = useGame({ level: 'expert' })
    const { width, height } = shape || {}
    return (
        <div
            style={{
                padding: 6,
                backgroundColor: '#c0c0c0',
                borderWidth: 3,
                borderStyle: 'solid',
                borderColor: '#fff #9f9f9f #9f9f9f #fff',
                borderRadius: 2,
            }}
        >
            <div
                style={{
                    height: 34,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: '#9c9c9c #fff #fff #9c9c9c',
                    marginBottom: 6,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 5,
                }}
            >
            </div>
            <div
                className="mine-grid"
                style={{
                    gridTemplateColumns: `repeat(${width}, ${100 / width}%)`,
                    borderWidth: 3,
                    borderRadius: 1,
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