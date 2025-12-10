/**
 * Build for chrome extension
 */
import type { RspackPluginInstance } from "@rspack/core"
import { CopyRspackPlugin } from "@rspack/core"
import baseConfig from "./rspack.base"
import { GenerateJsonPlugin } from "./plugins/generate-json"
import { FileManagerPlugin } from "./plugins/file-manager"
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

const fileManagerPlugin = new FileManagerPlugin({
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
})

baseConfig.mode = 'production'
baseConfig.output!.path = outputPath
baseConfig.plugins!.push(
    new GenerateJsonPlugin('manifest.json', manifest),
    new CopyRspackPlugin({
        patterns: [
            {
                from: path.join(__dirname, '..', 'asset'),
                to: path.join(outputPath, 'asset'),
            }
        ]
    }),
    fileManagerPlugin,
    ...localeJsonFiles,
)

if (typeof baseConfig.entry === 'object' && !Array.isArray(baseConfig.entry)) {
    baseConfig.entry['service-worker'] = './src/extension/service-worker'
}

export default baseConfig