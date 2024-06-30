/**
 * Build for chrome extension
 */
import type { WebpackPluginInstance } from "webpack"
import baseConfig from "./webpack.base"
import GenerateJsonPlugin from "generate-json-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import manifest from "../src/extension/manifest"
import path from "path"
import i18nChrome from "../src/i18n/chrome"

const localeJsonFiles = Object.entries(i18nChrome)
    .map(([locale, message]) => new GenerateJsonPlugin(`_locales/${locale}/messages.json`, message))
    .map(plugin => plugin as unknown as WebpackPluginInstance)

const outputPath = path.resolve(__dirname, '..', 'dist_mv3')

baseConfig.mode = 'production'
baseConfig.output.path = outputPath
baseConfig.plugins.push(
    new GenerateJsonPlugin('manifest.json', manifest) as unknown as WebpackPluginInstance,
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.join(__dirname, '..', 'asset'),
                to: path.join(outputPath, 'asset'),
            }
        ]
    }),
    ...localeJsonFiles,
)

baseConfig.entry['service-worker'] = './src/extension/service-worker'

export default baseConfig