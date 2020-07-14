import * as webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const IS_DEV = (process.env.NODE_ENV === "development");

const config: webpack.Configuration = {
    mode: !IS_DEV ? "production" : "development",
    devtool: !IS_DEV ? false : "source-map",
    entry: {
        main: "./src/client/index.tsx",
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css"],
        modules: [
            path.resolve(__dirname, "src/client"),
            path.resolve(__dirname, "node_modules"),
            "node_modules"
        ],
        alias: {
            "react-dom": "@hot-loader/react-dom",
            "@ant-design/icons$": path.resolve(__dirname, "src/client/icons.tsx")
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "react-hot-loader/webpack",
                    "ts-loader"
                ],
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
        }),
        new HtmlWebpackPlugin({
            template: "./src/client/index.html",
            filename: "./index.html",
        }),
        new BundleAnalyzerPlugin(),
    ],
};

export default config;
