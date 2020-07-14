import * as webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

const tsImportPluginFactory = require("ts-import-plugin");
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
        extensions: [".js", ".ts", ".tsx", ".less", ".css"],
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
                    {
                        loader: "ts-loader",
                        options: {
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: "antd",
                                        libraryDirectory: "es",
                                        style: true
                                    })
                                ]
                            }),
                            compilerOptions: {
                                module: "es2020"
                            }
                        }
                    }

                ],
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /favicon\.ico$/,
                use: "file-loader?name=[name].[ext]"
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
