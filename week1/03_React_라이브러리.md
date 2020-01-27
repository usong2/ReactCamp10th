# React 라이브러리

## 리액트가 하는 일

+ 리액트의 핵심 모듈 2개로 리액트가 하는 일 알아보기

  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  ```

### { React 컴포넌트 } -----> < DOM Element >

+ "만들어진 리액트 컴포넌트"를 실제 DOM 에 연결할 때 ReactDOM 을 이용합니다. 
+ [https://reactjs.org/docs/react-dom.html](https://reactjs.org/docs/react-dom.html)
+ [https://ko.reactjs.org/docs/react-dom.html](https://ko.reactjs.org/docs/react-dom.html)

### {React 컴포넌트 } 만들기

+ 리액트 컴포넌트를 만들 때 사용하는 API 모음
+ [https://reactjs.org/docs/react-api.html](https://reactjs.org/docs/react-api.html)
+ [https://ko.reactjs.org/docs/react-api.html](https://ko.reactjs.org/docs/react-api.html)

### Use React, ReactDOM Library with CDN

+ CDN 을 통한 리액트 라이브러리 사용

+ [https://reactjs.org/docs/cdn-links.html](https://reactjs.org/docs/cdn-links.html)

+ [https://ko.reactjs.org/docs/cdn-links.html](https://ko.reactjs.org/docs/cdn-links.html)

  ```bash
  $ mkdir react-cdn
  $ cd react-cdn
  $ npm init -y
  $ code .
  $ npm i serve
  ```

  ```json
  // package.json
  {
      "name": "react-cdn",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
      	"start": "serve" // update
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
          "serve": "^11.2.0"
      }
  }
  ```

  ```html
  <!-- index.html : CDN 을 통해 React, ReactDOM 가져오기 -->
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
    </head>
    <body>
      <div id="root"></div>
        
      <script
        crossorigin
        src="https://unpkg.com/react@16/umd/react.development.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      ></script>
      <script type="text/javascript">
        // Global 에 React 와 ReactDOM 객체가 생성
        console.log(React);
        console.log(ReactDOM);
        
        const dom = document.getElementById('root');
        const component = React.createElement('span', null, 'Usong');
        ReactDOM.render(component, dom);
      </script>
    </body>
  </html>
  ```

  ```bash
  $ npm start
  ```

  ```html
  <!-- index.html : CDN 을 통해 React, ReactDOM 가져오기 -->
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
    </head>
    <body>
      <div id="root"></div>
        
      <script
        crossorigin
        src="https://unpkg.com/react@16/umd/react.development.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      ></script>
      <script type="text/javascript">
        // Global 에 React 와 ReactDOM 객체가 생성
        console.log(React);
        console.log(ReactDOM);
        
        const dom = document.getElementById('root');
        const component = React.createElement('div', null, 'Usong', React.createElement("p", null, "hello"));
        ReactDOM.render(component, dom);
          
        // JSX => React.createElement("span", null, "red");
      </script>
    </body>
  </html>
  ```

  ```react
  // JSX 
  ReactDOM.render(
      <div>
      	Usong
          <p>
          	Hello<span>red</span>
          </p>
      </div>
  );
  
  // JSX를 React.createElement로 바꾸어주는 행위는 Transfiler(ex. Babel, TypeScript)
  // Transfiler를 가지고 자바스크립트를 하나로 묶어주는 행위는 Bundler(ex. Webpack)
  ```

  ```html
  <!-- index.html : CDN 을 통해 React, ReactDOM 가져오기 -->
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
    </head>
    <body>
      <div id="root"></div>
        
      <script
        crossorigin
        src="https://unpkg.com/react@16/umd/react.development.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      ></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script type="text/babel">
        // Global 에 React 와 ReactDOM 객체가 생성
        console.log(React);
        console.log(ReactDOM);
        
        const dom = document.getElementById('root');
        
        const component = React.createElement('div', null, 'Usong', React.createElement("p", null, "hello", React.createElement("span", null, "red")));
        
        // JSX => React.createElement("span", null, "red");
        
        ReactDOM.render(
        	<div>
        		Usong
        		<p>
        			Hello<span>red</span>
        		</p>
        	</div>,
         	dom
        );
      </script>
    </body>
  </html>
  ```

<br>

## 브라우저 지원

React는 Internet Explorer 9와 상위 버전을 포함한 모든 주요 브라우저를 지원합니다. 그러나 IE 9와 IE 10과 같은 구형 브라우저는 폴리필(polyfill)이 필요합니다. 

> **주의**
>
> 우리는 ES5 메서드를 지원하지 않는 구형 브라우저를 지원하지 않지만, 페이지에 es5-shim과 es5-sham과 같은 폴리필을 포함한다면 앱이 구형 브라우저에서도 동작할 수 있습니다. 이 길을 선택한다면 스스로 해결해야 합니다. 

<br>





