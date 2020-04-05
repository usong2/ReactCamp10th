# Ant Design

```bash
$ npx create-react-app antd-example
$ cd antd-example
$ npm i antd
```

## 전역 사용

```jsx
import 'antd/dist/antd.css';       // <= 전역 스타일 추가
import { DatePicker } from 'antd'; // <= 리액트 컴포넌트
```

+ ./src/index.js 수정

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import 'antd/dist/antd.css';
  import App from './App';
  import * as serviceWorker from './serviceWorker';
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
  serviceWorker.unregister();
  ```

+ ./src/App.js 수정

  ```jsx
  import React from 'react';
  import { DatePicker } from 'antd';
  
  function App() {
    return (
      <div className="App">
        <DatePicker />
      </div>
    );
  }
  
  export default App;
  ```

<br>

## modularized 1

+ 해당 CSS만 가져와서 사용

```jsx
import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style/css';
```

+ ./src/index.js(수정 없음)

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import * as serviceWorker from './serviceWorker';
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
  serviceWorker.unregister();
  ```

+ ./src/App.js 수정

  ```jsx
  import React from 'react';
  import DatePicker from 'antd/es/date-picker';
  import 'antd/es/date-picker/style/css';
  
  function App() {
    return (
      <div className="App">
        <DatePicker />
      </div>
    );
  }
  
  export default App;
  ```

<br>

## modularized 2

+ babel loader에서 해당 컴포넌트를 import하면 자동으로 스타일을 찾아 import

```bash
$ npm run eject
$ npm install babel-plugin-import --save-dev
```

```json
/* ./package.json */
{
  ...
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }
      ]
    ]
  },
  ...
}
```

+ ./src/index.js(수정 없음)

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import * as serviceWorker from './serviceWorker';
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
  serviceWorker.unregister();
  ```

+ ./src/App.js 수정

  ```jsx
  import React from 'react';
  import { DatePicker } from 'antd';
  
  function App() {
    return (
      <div className="App">
        <DatePicker />
      </div>
    );
  }
  
  export default App;
  ```

<br>

## Storybook

+ [https://storybook.js.org/docs/examples/](https://storybook.js.org/docs/examples/)

<br>

## Button Component

### import { Icon } from 'antd';

+ 참고: [https://ant.design/components/button/](https://ant.design/components/button/)

```jsx
/* ./src/App.js */
import React from 'react';
import { Button } from 'antd';

export default class LoadingButton extends React.Component {
  state = {
    loading: false,
  };

  startLoading = () => {
    console.log('start');
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    return (
      <Button
        type="primary"
        size="large"
        icon="heart"
        loading={loading}
        onClick={this.startLoading}
        style={{
          width: 50,
        }}
      />
    );
  }
}
```

<br>

## Icon Component

```bash
$ npm install @ant-design/icons --save-dev
```

### import { Icon } from 'antd';

+ 참고: [https://ant.design/components/icon/](https://ant.design/components/icon/)

```jsx
/* ./src/App.js */

import React from 'react';
import LoadingButton from './components/LoadingButton';
import { Icon } from 'antd';

function App() {
  return (
    <div className="App">
      <p>
        <LoadingButton />
      </p>
      <p>
        저는 <Icon type="twitter" /> 를 잘 안해요!
      </p>
    </div>
  );
}

export default App;
```