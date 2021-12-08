const webpack = require('webpack')
const path = require('path')

// 打包文件分析工具：用于后期文件包的优化
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 抽离CSS样式，防止将CSS打包在js中引起页面样式加载错乱
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// webpack打包的文件将要存放的位置，本文件中的相对路径都是相对于它
const DIST_PATH = './lib/template/assets/script'
const isProd = process.env.NODE_ENV === 'production'
const isWatched = process.env.WATCH === 'true'
// const showAnalysis = process.env.ANA === 'true'

// 代码优化相关
const TerserPlugin = require('terser-webpack-plugin')

let plugins = [
  // fix "process is not defined" error:
  // (do "npm install process" before running the build)
  new webpack.ProvidePlugin({
    process: 'process/browser'
  }),
  // 将 css 从文本中提取出来，参数为资源存放的位置(此处是lib/template/assets/css/DaEngine.min.css，因为此时的路径是DIST_PATH)
  new MiniCssExtractPlugin({
    filename: '../css/weweb.min.css'
  })
]

// if (showAnalysis) {
//   plugins = plugins.concat([new BundleAnalyzerPlugin()])
// }

if (isProd) {
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: true,
    //     dead_code: true,
    //     properties: true,
    //     evaluate: true
    //   },
    //   output: {
    //     comments: false
    //   }
    // }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ])
}

function getPath (rPath) {
  return path.resolve(__dirname, rPath)
}

function getSourcePath (rPath) {
  return getPath(`./src/${rPath}`)
}

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    DaEngine: getSourcePath('index.ts')
  },
  output: {
    filename: '[name].js',
    publicPath: 'script/',
    chunkFilename: '[name].wd.chunk.js',
    path: getPath(DIST_PATH)
  },
  watch: isWatched,
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html/i,
        use: 'html-loader'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader'
          // 注意此处 outputPath 为输出结果的地址
          // 'file-loader?name=[name].[ext]&publicPath=&outputPath=../images/'
        ]
      },
      {
        test: /\.et/,
        use: 'ei-loader'
      },
      {
        test: /\.json$/,
        use: 'json'
      }
    ]
  },
  stats: {
    modulesSort: 'size',
    chunksSort: 'size',
    assetsSort: 'size'
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()]
  },
  plugins: plugins
}
