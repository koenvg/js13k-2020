const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (env) => {
  const isProd = env === "prod";

  process.env["NODE_ENV"] = isProd ? "production" : "development";

  const plugins = [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        removeScriptTypeAttributes: true,
        removeTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        inlineSource: ".(js|ts)$",
      },
      svgoConfig: {
        removeViewBox: true,
        removeDimensions: false,
        convertTransform: true,
        cleanupNumericValues: {
          floatPrecision: 1,
        },
        convertPathData: {
          floatPrecision: 1,
        },
      },
    }),

    new ExtraWatchWebpackPlugin({
      files: ["assets/**/*.png", "assets/**/*.json"],
    }),
  ];

  if (isProd) {
    plugins.push(
      new ScriptExtHtmlWebpackPlugin({
        inline: "bundle",
      })
    );
    plugins.push(new ZipPlugin({ filename: "bundle.zip" }));
  }

  return {
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: ["ts-loader", "webpack-conditional-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      plugins: [new TsconfigPathsPlugin()],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: plugins,
    devtool: isProd ? false : "source-map",
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: {
              properties: {
                keep_quoted: true,
              },
            },
          },
        }),
      ],
    },
  };
};
