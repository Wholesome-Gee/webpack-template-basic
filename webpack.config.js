//import 
const path = require('path'); // node js의 전역객체 path를 불러옴
const HtmlPlugin = require('html-webpack-plugin') // html-webpack-plugin 패키지 불러옴
const CopyPlugin = require('copy-webpack-plugin') // copy-webpack-plugin 패키지 불러옴
// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  // webpack이 컴파일한 결과물을 어디에 저장할 것인지 설정
  output: {
    // node js의 전역변수 __dirname으로 path의 기본 경로 설정
    path: path.resolve(__dirname, 'dist'), // 기본값
    filename:'main.js', // 기본값
    clean: true,
  },
  
  // webpack의 module 설정
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          //순서 중요
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    // webpack에게 index.html을 template으로 번들링 하라고 지정
    new HtmlPlugin({
      template: './index.html'
    }),
    // webpack에게 static 폴더를 번들링 하라고 지정
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ]
}