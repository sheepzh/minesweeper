import { DefinePlugin } from "@rspack/core"
import baseConfig from "./rspack.base"

baseConfig.mode = 'development'
baseConfig.plugins!.push(
    new DefinePlugin({
        "window._IS_DEV_": JSON.stringify(true),
    }),
)

export default baseConfig