/**
 * Build for chrome extension
 */
import type { WebpackPluginInstance } from "webpack"
import baseConfig from "./webpack.base"
import GenerateJsonPlugin from "generate-json-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import FileManagerWebpackPlugin from "filemanager-webpack-plugin"
import manifest from "../src/extension/manifest"
import path from "path"
import i18nChrome from "../src/i18n/chrome"
import packageInfo from "../package.json"
const { name, version } = packageInfo

const outputPath = path.resolve(__dirname, '..', 'dist_mv3')
const marketPkgPath = path.resolve(__dirname, '..', 'market_packages')
const normalZipFilePath = path.resolve(marketPkgPath, `${name}-${version}.mv3.zip`)

const localeJsonFiles = Object.entries(i18nChrome)
    .map(([locale, message]) => new GenerateJsonPlugin(`_locales/${locale}/messages.json`, message))
    .map(plugin => plugin as unknown as WebpackPluginInstance)

const fileManagerWebpackPlugin = new FileManagerWebpackPlugin({
    events: {
        // Archive at the end
        onEnd: [
            { delete: [path.join(outputPath, '*.LICENSE.txt')] },
            // Define plugin to archive zip for different markets
            {
                delete: [normalZipFilePath],
                archive: [{
                    source: outputPath,
                    destination: normalZipFilePath,
                }]
            },
        ]
    }
}) as WebpackPluginInstance

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
    fileManagerWebpackPlugin,
    ...localeJsonFiles,
)

baseConfig.entry['service-worker'] = './src/extension/service-worker'

export default baseConfig