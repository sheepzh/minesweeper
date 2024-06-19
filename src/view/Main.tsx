import React from "react"
import Action from "./components/Action"
import Game from "./components/Game"

const Main = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Action />
            <Game />
        </div>
    )
}

export default Main