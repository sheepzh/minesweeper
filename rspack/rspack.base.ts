import { Configuration, HtmlRspackPlugin } from "@rspack/core"
import path from "path"

const config: Configuration = {
    entry: {
        index: './src/view',
    },
    experiments: {
        css: true,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /^(node_modules|test|script)/,
            loader: 'builtin:swc-loader',
            options: {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                    },
                },
            },
        }, {
            test: /\.css$/,
            type: 'css/auto',
        }, {
            test: /\.(png)$/,
            type: 'asset/resource',
        }],
    },
    output: {
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", '.css'],
        tsConfig: path.resolve(__dirname, '../tsconfig.json'),
    },
    plugins: [
        new HtmlRspackPlugin({
            filename: path.join('index.html'),
            title: 'Nothing Here',
            chunks: ['index'],
        }),
    ],
}

export default config