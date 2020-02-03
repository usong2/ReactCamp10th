# Create React App

## CRA

[https://facebook.github.io/create-react-app/](https://facebook.github.io/create-react-app/)

```bash
npx create-react-app tic-tac-toe
```

<br>

## npx

+ npm 5.2.0 이상부터 함께 설치된 커맨드라인 명령어

![npx](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6339318/스크린샷_2019-07-08_오후_9.53.54.png)

<br>

### 왜 npx 가 필요했을까요??

+ 프로젝트의 로컬에 설치된 패키지의 실행 커맨드를 사용하려면, 
  + package.json 의 npm scripts 에 명령어를 추가하여 사용해야 했다.
  + npx 로 바로 실행 가능
+ 전역으로 실행하고 싶은 패키지가 있을 경우,
  + npm i -g 를 이용하여, 전역에 꼭 설치해서 사용해야 가능했다.
  + npx 로 최신 버전의 패키지를 받아 바로 실행 가능

<br>

### npx create-react-app tic-tac-toe

+ npx create-react-app 프로젝트 이름

```json
/* package.json */

{
  "name": "tic-tac-toe",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

<br>

#### 리액트 핵심 모듈

+ "react": "^16.12.0"
+ "react-dom": "^16.12.0"

#### cra 를 사용하는데 필요한 모듈

+ "react-scripts": "3.1.2"

<br>

#### npm start

+ react-scripts start

+ **Starting the development server...**

  ![npm start](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6351288/스크린샷_2019-07-12_오전_2.14.31.png)

  + 개발용 서버를 띄웁니다. 
    소스 코드가 수정되었을 때, 다시 컴파일 하고 웹페이지를 새로고침 합니다. 

#### npm run build

+ react-scripts build

+ **Creating an optimized production build...**

  ![npm run build](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6351283/스크린샷_2019-07-12_오전_2.15.53.png)

  ![npm run build](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6351295/스크린샷_2019-07-12_오전_2.18.29.png)

  + Project 폴더 바로 아래 build 라는 폴더가 만들어지고, 그 안에 production 배포를 위한 파일들이 생성됩니다. 

  ##### npm install serve -g

  ```bash
  npm install serve -g
  serve -s build
  ```

  + serve 라는 패키지를 전역으로 설치합니다. 
  + serve 명령어를 -s 옵션으로 build 폴더를 지정하여 실행합니다. 
    + -s 옵션은 어떤 라우팅으로 요청해도 index.html 을 응답하도록 합니다. 

  <br>

#### npm test

+ react-scripts test

+ **Jest 를 통해 test code 를 실행합니다. **

  ![npm test](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6351356/스크린샷_2019-07-12_오전_2.42.33.png)

  + `_tests_` 폴더 안의 .js 파일
  + `.test.js` 로 끝나는 파일
  + `.spec.js` 로 끝나는 파일

#### npm run eject

+ react-scripts eject

  ![npm run eject](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6351366/스크린샷_2019-07-12_오전_2.48.22.png)

  + eject 를 이용하면, cra 로 만든 프로젝트에서 cra 를 제거합니다. 
    이는 돌이킬 수 없기 때문에 결정하기 전에 신중해야 합니다. 
  + 보통 cra 내에서 해결이 안되는 설정을 추가해야 할 때 합니다. 

+ Y 선택 시

  ```json
  {
    "name": "tic-tac-toe",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@babel/core": "7.4.3",
      "@svgr/webpack": "4.1.0",
      "@typescript-eslint/eslint-plugin": "1.6.0",
      "@typescript-eslint/parser": "1.6.0",
      "babel-eslint": "10.0.1",
      "babel-jest": "^24.8.0",
      "babel-loader": "8.0.5",
      "babel-plugin-named-asset-import": "^0.3.2",
      "babel-preset-react-app": "^9.0.0",
      "camelcase": "^5.2.0",
      "case-sensitive-paths-webpack-plugin": "2.2.0",
      "css-loader": "2.1.1",
      "dotenv": "6.2.0",
      "dotenv-expand": "4.2.0",
      "eslint": "^5.16.0",
      "eslint-config-react-app": "^4.0.1",
      "eslint-loader": "2.1.2",
      "eslint-plugin-flowtype": "2.50.1",
      "eslint-plugin-import": "2.16.0",
      "eslint-plugin-jsx-a11y": "6.2.1",
      "eslint-plugin-react": "7.12.4",
      "eslint-plugin-react-hooks": "^1.5.0",
      "file-loader": "3.0.1",
      "fs-extra": "7.0.1",
      "html-webpack-plugin": "4.0.0-beta.5",
      "identity-obj-proxy": "3.0.0",
      "is-wsl": "^1.1.0",
      "jest": "24.7.1",
      "jest-environment-jsdom-fourteen": "0.1.0",
      "jest-resolve": "24.7.1",
      "jest-watch-typeahead": "0.3.0",
      "mini-css-extract-plugin": "0.5.0",
      "optimize-css-assets-webpack-plugin": "5.0.1",
      "pnp-webpack-plugin": "1.2.1",
      "postcss-flexbugs-fixes": "4.1.0",
      "postcss-loader": "3.0.0",
      "postcss-normalize": "7.0.1",
      "postcss-preset-env": "6.6.0",
      "postcss-safe-parser": "4.0.1",
      "react": "^16.8.6",
      "react-app-polyfill": "^1.0.1",
      "react-dev-utils": "^9.0.1",
      "react-dom": "^16.8.6",
      "resolve": "1.10.0",
      "sass-loader": "7.1.0",
      "semver": "6.0.0",
      "style-loader": "0.23.1",
      "terser-webpack-plugin": "1.2.3",
      "ts-pnp": "1.1.2",
      "url-loader": "1.1.2",
      "webpack": "4.29.6",
      "webpack-dev-server": "3.2.1",
      "webpack-manifest-plugin": "2.0.4",
      "workbox-webpack-plugin": "4.2.0"
    },
    "scripts": {
      "start": "node scripts/start.js",
      "build": "node scripts/build.js",
      "test": "node scripts/test.js"
    },
    "eslintConfig": {
      "extends": "react-app"
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    },
    "jest": {
      "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
      ],
      "setupFiles": [
        "react-app-polyfill/jsdom"
      ],
      "setupFilesAfterEnv": [],
      "testMatch": [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
      ],
      "testEnvironment": "jest-environment-jsdom-fourteen",
      "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
      },
      "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
      ],
      "modulePaths": [],
      "moduleNameMapper": {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
      },
      "moduleFileExtensions": [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
      ],
      "watchPlugins": [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
      ]
    },
    "babel": {
      "presets": [
        "react-app"
      ]
    }
  }
  ```

  + react-scripts 는 사라집니다. 
  + 드러내지 않고 cra 에 의해 사용되던 각종 패키지가 package.json 에 나타납니다. 
  + Jest, Babel, ESLint 설정이 추가됩니다. 
  + 각종 설정 파일이 config 폴더에 생성됩니다.  

<br>

```bash
webpack -------> # 파일 확장자에 맞는 loader 에게 위임
├── babel-loader -------> # babel config : 어떤 문법을 번역할건지 설정
│   ├── js  
│   ├── jsx
└── css-loader   -------> # 최초 배포용 파일
    └── css
```

<br>

## ESLint

+ The pluggable linting utility for JavaScript and JSX
+ 자바스크립트로 되어 있는 코드를 설정된 규칙에 맞출 수 있음

### 설치

```bash
mkdir eslint-test
cd eslint-test
npm init -y
npm install eslint -D
npx eslint --init
# ? How would you like to use ESLint? 
#	- To check syntax and find problems
# ? What type of modules does your project use? (User arrow keys)
#	- CommonJS (require/exports)
# ? Which framework does your project use? 
#	- None of these
# ? Does your project use TypeScript?
#	- No
# ? Where does your code run? 
#	- Node
# ? What format do you want your config file to be in? 
#	- JSON
code .
```

+ 설정 파일 확인

```json
/* .eslintrc.json */
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
    }
}
```

<br>

### 별도의 파일이 아닌 package.json 에서 ESLint 설정 방법

```json
/* package.json */
{
  "name": "eslint-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^6.8.0"
  },
  "eslintConfig": {
        "env": {
            "browser": true,
            "commonjs": true,
            "es6": true
        },
        "extends": "eslint:recommended",
        "globals": {
            "Atomics": "readonly",
            "SharedArrayBuffer": "readonly"
        },
        "parserOptions": {
            "ecmaVersion": 2018
        },
        "rules": {
        }
    }
}

```

<br>

### rule 추가

```json
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "semi": [
            "error",
            "always"
        ]
    }
}
```

+ rule 참고 : [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)

<br>

### 테스트

```js
// index.js
console.log("hello")
```

```bash
npx eslint index.js
```

<br>

![ESLint](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6354171/스크린샷_2019-07-12_오후_9.37.58.png)

<br>

### eslintConfig

```json
/* tic-tac-toe/package.json */
{
  "name": "tic-tac-toe",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.4.0",
    "@testing-library/user-event": "^7.2.1",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app" // eslint-config-react-app
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

+ 참고 : [npmjs.com/package/eslint-config-react-app](npmjs.com/package/eslint-config-react-app) 
  		  [https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js)

<br>

