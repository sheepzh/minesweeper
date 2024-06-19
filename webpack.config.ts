import { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"
import tsConfig from "./tsconfig.json"
const tsPathAlias = tsConfig.compilerOptions.paths

// Process the alias of typescript modules
const resolveAlias: { [index: string]: string | false | string[] } = {}
const aliasPattern = /^(@.*)\/\*$/

Object.entries(tsPathAlias).forEach(([alias, sourceArr]) => {
    // Only process the alias starts with '@'
    if (!aliasPattern.test(alias)) {
        return
    }
    if (!sourceArr.length) {
        return
    }
    const index = alias.match(aliasPattern)[1]
    const webpackSourceArr = sourceArr.map(folder => path.resolve(__dirname, folder.replace(/\/\*$/, '')))
    resolveAlias[index] = webpackSourceArr
})
console.log("Alias of typescript: ")
console.log(resolveAlias)

const webpackConfig: Configuration = {
    entry: {
        index: './src/view',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /^(node_modules|test|script)/,
            use: ['ts-loader']
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }],
    },
    output: {
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", '.css', '.scss', '.sass'],
        alias: resolveAlias,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: path.join('index.html'),
            chunks: ['index'],
        }),
    ],
}

export default webpackConfig