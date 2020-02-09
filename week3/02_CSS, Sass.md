# CSS, Sass

+ 인라인 방식 : 변경이 없어도 props가 계속 새로운 오브젝트로 됨

  ```jsx
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  
  function App() {
      return (
      	<div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit 
                  <code 
                      style={{
                          color: "red"
                      }}
                  >
                  	src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
      );
  }
  
  export default App;
  ```

+ 변수선언 방식

  ```jsx
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  
  const style = {
      color: "red"
  };
  
  function App() {
      return (
      	<div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit 
                  <code style={style}>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
      );
  }
  
  export default App;
  ```

<br>

## App.css

+ .App
+ .App-header
+ .App-logo
+ .App-link

<br>

+ .App
+ .App .header
+ .App .logo
+ .App .link

<br>

## Naming 규칙 사례

+ ![Naming](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6375058/스크린샷_2019-07-17_오전_12.36.11.png)
+ 참고 : [http://getbem.com/naming/](http://getbem.com/naming/)

<br>

## App.scss

```jsx
<div className="App">
  <header className="header">
    <img src={logo} className="logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
```

+ .App
+ .App .header
+ .App .logo
+ .App .link

```scss
.App {
  text-align: center;

  .logo {
    height: 40vmin;
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link {
    color: #09d3ac;
  }
}
```

<br>

## Sass

![Sass](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6375099/스크린샷_2019-07-19_오후_5.08.53.png)

+ 구조적인 CSS를 작성할 수 있도록 도움
+ CSS에서 동적으로 지원하지 않는 것들은 불가능
+ 참고 : [https://sass-lang.com/guide](https://sass-lang.com/guide)

```css
/* css */

body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

```scss
/* scss : css와 유사 */

$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss
/* Sass */

SASS SYNTAX
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

<br>

## scss

```jsx
/* src/App.js */

import "./App.scss";
```

```scss
/* src/App.scss */

.App {
  text-align: center;

  .logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
```

![Failed to compile](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6644384/스크린샷_2019-10-12_오전_1.29.35.png)

+ scss 를 css 로 바꿔줄 모듈이 없음

```bash
npm i node-sass
```

+ naming 관리 시에는 Sass 사용 추천

