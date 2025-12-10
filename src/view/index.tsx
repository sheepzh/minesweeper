/** @jsxImportSource @emotion/react */
import React from "react"
import { createRoot } from "react-dom/client"
import Main from "./Main"
import { GlobalStyles } from "./styles"
import "xp.css/dist/XP.css"

const main = () => {
    const appContainerEle = document.createElement('div')
    appContainerEle.id = 'app'
    document.body.append(appContainerEle)

    const root = createRoot(appContainerEle)
    root.render(
        <>
            <GlobalStyles />
            <Main />
        </>
    )
}

main()
