
/*
loader  1.下载  2.使用（配置loader）
plugins  1.下载  2.引入  3.使用
 */

// resolve 用来拼接绝对路径的方法
const { resolve } = require('path')
// 引入
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 有五个核心配置
module.exports = {
  // webpack配置
  entry: './src/main.js', // 入口起点
  output: {
    filename: './js/built.js', // 输出文件名  (决定的是入口文件的输出路径)
    // __dirname 是  nodejs的变量，代表当前文件的目录的绝对路径（当前文件的更目录）
    path: resolve(__dirname, 'build') // 输出路径   输出的根文件名称
  },
  // loader配置
  module: {
    // 是个数组
    rules: [
      {
        // 详细的loader配置
        // 匹配哪些文件
        test: /\.css$/, // 所有.css结尾的文件
        use: [
          // 执行顺序，从后往前（从下到上 或称为从右到左）
          'style-loader', // 创建style标签，将js（'css-loader中生成的样式字符串）中的样式资源插入  ，添加到head中生效
          'css-loader'// 将css文件变成commonjs模块加载到js中。以字符串的形式（里面的内容是样式字符串）
        ]
      },

      {
        test: /\.less$/,
        use: [
          // 执行顺序，从后往前（从下到上 或称为从右到左）
          'style-loader', // 创建style标签，将js（'css-loader中生成的样式字符串）中的样式资源插入  ，添加到head中生效
          'css-loader', // 将css资源变成commonjs模块加载到js中。以字符串的形式（里面的内容是样式字符串）
          // 需要下载 less-loader 和less
          'less-loader'// 将less资源转成css资源
        ]
      },
      {
        test: /\.(jpg||png||gif)$/,
        // 使用一个loader
        // 下载url-loader 和 file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb的时候，就会被base64处理
          // base64优点：减小请求数量（减轻服务器压力），缺点：图片体积变大（文件请求变慢）
          limit: 8 * 1024,
          // 注意：因为url-loader默认使用es6模块化解析的，而html-loader引入图片是common.js
          // 解析时会出现问题：[object Module]
          // 解决:关闭url-loader的es6模块化，使用common.js解析
          esModule: false,
          // 给图片重命名
          // [hash:10]取图片的hash值的前10位
          name: '[hash:10].[ext]',

          outputPath: 'img'// 符合当前匹配规则的文件的输出位置路径
        }

      },
      {
        test: /\.html$/,
        // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader',

        options: {
          outputPath: 'img'// 符合当前匹配规则的文件的输出位置路径
        }

      },
      // 打包其他资源（除了html/js/css/等等资源以外的其他资源）
      {
        exclude: /\.(css||js||html||jpg||png||gif||less||json)$/,
        loader: 'file-loader',
        options: {
          // [hash:10]取图片的hash值的前10位
          name: '[hash:10].[ext]',
          outputPath: 'file'// 符合当前匹配规则的文件的输出位置路径
        }
      }
    ]
  },
  // plugins 的配置  是个数组
  plugins: [
    // html-webpack-plugin
    // 功能，默认会创建一个空的html，引入打包输出的所有的资源（js/css）
    new HtmlWebpackPlugin(
      { // 创建一个在内存中生成html页面插件的配置对象
        template: './src/index.html', // 指定模版页面生成内存中的hmtl
        filename: 'index.html' // 指定生成的页面名称
      }
    )
  ],
  // 打包的模式
  mode: 'development', // 开发模式
  // mode:'production',/生产模式   会压缩代码

  // 开发服务器 devServer :用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    open: true // 是否自动打开浏览器（电脑默认浏览器）
  }
}
