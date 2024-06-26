import React from "react"
import { createRoot } from "react-dom/client"
import Main from "./Main"
import "./style.sass"
import "xp.css/dist/XP.css"

const main = () => {
    const appContainerEle = document.createElement('div')
    appContainerEle.id = 'app'
    document.body.append(appContainerEle)

    const root = createRoot(appContainerEle)
    root.render(<Main />)
}

main()
