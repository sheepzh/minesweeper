import { DefinePlugin } from "webpack"
import baseConfig from "./webpack.base"

baseConfig.mode = 'development'
baseConfig.plugins.push(
    new DefinePlugin({
        "window._IS_DEV_": "true",
    }),
)

export default baseConfig