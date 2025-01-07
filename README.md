# 프론트엔드 패키지 Online Part7_Ch2.Webpack강의
## 01. 프로젝트 생성
- `npm init -y`
- `npm i -D webpack webpack-cli webpack-dev-server@next`
  - webpack : webpack 번들러 패키지
  - webpack-cli : CLI로 webpack 명령어를 사용할 수 있게 하는 패키지
  - webpack-dev-server : webpack 개발 서버를 오픈할때 새로고침을 해주는 패키지
- package.json 
  ```json
  "scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
  ```
- index.html 생성
  ```html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Webpack!</title>
  </head>
  <body>
    <h1>Hello Webpack!!</h1>
  </body>
  </html>
  ```
- js/main.js 생성
  ```js
  console.log('Webpack!');
  ```
- webpack.config.js 생성
- .gitignore 생성
  ```.gitignore
  .cache
  node_modules
  dist
  ```
- `git init`
<br/>

## 02. entry, output
- webapck.config.js
  ```js
  //import 
  // node js의 전역객체 path를 불러옴
  const path = require('path');

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
  }
  ```
<br/>

## 03. plugins
- webpack이 index.html도 번들링 하도록 설정하기
- `npm i -D html-webpack-plugin`
- webpack.config.js 
  ```js
  //import 
  const HtmlPlugin = require('html-webpack-plugin') // html-webpack-plugin 패키지 불러옴

  // export
  module.exports = {
    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
      // webpack에게 index.html을 template으로 지정한다고 알림
      new HtmlPlugin({
        template: './index.html'
      })
    ]
  }
  ```
<br/>

## 04. 정적 파일 연결 (static)
- webpack이 image, favicon 등 파일도 번들링 하도록 설정하기
- static/images 생성 ➡️ static에 favicon.ico 생성 ➡️ images에 logo.png 생성
- index.html
  ```html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Webpack!</title>
  </head>
  <body>
    <h1>Hello Webpack!!</h1>
    <img src="./images/logo.png" alt="McDonald">
  </body>
  </html>
  ```
- `npm i -D copy-webpack-plugin`
- webpack.config.js
  ```js
  //import 
  const CopyPlugin = require('copy-webpack-plugin') // copy-webpack-plugin 패키지 불러옴
  
  // export
  module.exports = {
    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
      // webpack에게 static 폴더를 번들링 하라고 지정
      new CopyPlugin({
        patterns: [
          { from: 'static' }
        ]
      })
    ]
  }
  ```

<br/>

## 05. module
- webpack이 css 파일도 번들링 하도록 설정하기
- `npm i -D css-loader style-loader`
- css/main.css 생성
  ```css
  body {
    background-color: royalblue;
  }
  ```
- main.js
  ```js
  import '../css/main.css';
  ```
- webpack.config.js
  ```js
  // export
  module.exports = {
    // webpack의 module 설정
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            //순서 중요
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
  }
  ```
<br/>

## 06. SCSS
- webpack이 css 파일도 번들링 하도록 설정하기
- `npm i -D sass-loader sass`
  - sass-loader : webpack이 scss 파일을 읽을 수 있도록 해주는 패키지
  - sass : webpack이 scss파일을 읽을 때 참조하는 패키지
- scss/main.scss 생성
  ```scss
  $color--orange: orange;

  body {
    h1 {
      color: $color--orange;
    }
  }
  ```
- main.js
  ```js
  import '../scss/main.scss';
  ```
- webpack.config.js
  ```js
  // export
  module.exports = {
    // webpack의 module 설정
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            //순서 중요
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
  }
  ```
<br/>

## 07. Autoprefixer(PostCSS)
- Webpack으로 공급업체 접두사 설정해주기
- `npm i -D postcss autoprefixer postcss-loader`
- main.scss
  ```scss
  $color--orange: orange;

  body {
    h1 {
      display: flex;
    }
  }
  ```
- webpack.config.js
  ```js
  // export
  module.exports = {
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
        }
      ]
    },
  }
  ```
- package.json
  ```json
  {
    // 제일 하단부
    "browserslist":[
      "> 1%",
      "last 2 versions"
    ]
  }

  ```
- .postcssrc.js 생성
  ```js
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```
<br/>

## 08. babel
- Webpack으로 babel 패키지 설정해주기
  - babel : ES6 이후 문법을 ES5 이전 브라우저에서 읽을 수 있도록 변환해주는 패키지
- `npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime`
- `npm i -D babel-loader`
- .babelrc.js 생성
  ```js
  module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
      ['@babel/plugin-transform-runtime']
    ]
  }
  ```
- webpack.config.js
  ```js
  // export
  module.exports = {
    // webpack의 module 설정
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader' // webpack이 babel을 읽을 수 있도록 해주는 패키지
          ]
        }
      ]
    },
  }
  ```
<br/>

## 09. Netlify 배포

<br/>

## 10. 프로젝트 생성
