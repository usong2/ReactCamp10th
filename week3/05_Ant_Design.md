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

<br>

## Row, Col Component

### import { Row, Col } from 'antd';

+ 참고: [https://ant.design/components/grid/](https://ant.design/components/grid/)

#### <Col span={24 중에 어느정도 차지할 지 정수} />

```jsx
/* ./src/App.js */

import React from 'react';
import { Row, Col } from 'antd';

const colStyle = () => ({
  height: 50,
  backgroundColor: 'red',
  opacity: Math.round(Math.random() * 10) / 10,
});

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={12} style={colStyle()} />
        <Col span={12} style={colStyle()} />
      </Row>
      <Row>
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
      </Row>
      <Row>
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
      </Row>
    </div>
  );
}

export default App;
```

#### <Row gutter={16 + 8n 의 정수} />

```jsx
/* ./src/App.js */

import React from 'react';
import { Row, Col } from 'antd';

function MyCol({ span }) {
  return (
    <Col span={span}>
      <div style={{ height: 50, backgroundColor: 'red', opacity: 0.7 }} />
    </Col>
  );
}

export default function App() {
  return (
    <div className="App">
      <Row gutter={16}>
        <MyCol span={12} />
        <MyCol span={12} />
      </Row>
      <Row gutter={16}>
        <MyCol span={8} />
        <MyCol span={8} />
        <MyCol span={8} />
      </Row>
      <Row gutter={16}>
        <MyCol span={6} />
        <MyCol span={6} />
        <MyCol span={6} />
        <MyCol span={6} />
      </Row>
    </div>
  );
}
```

#### <Col offset={24 중 건너띄고 싶은 정수} />

```jsx
/* ./src/App.js */

import React from 'react';
import { Row, Col } from 'antd';

function MyCol({ span, offset }) {
  return (
    <Col span={span} offset={offset}>
      <div style={{ height: 50, backgroundColor: 'red', opacity: 0.7 }} />
    </Col>
  );
}

export default function App() {
  return (
    <div className="App">
      <Row gutter={16}>
        <MyCol span={12} offset={12} />
      </Row>
      <Row gutter={16}>
        <MyCol span={8} />
        <MyCol span={8} offset={8} />
      </Row>
      <Row gutter={16}>
        <MyCol span={6} />
        <MyCol span={6} offset={3} />
        <MyCol span={6} offset={3} />
      </Row>
    </div>
  );
}
```

#### &lt;Row type="flex" justify="좌우정렬" align="위아래정렬" /&gt;

+ *"start" | "center" | "end" | "space-between" | "space-around"*

  *"top" | "middle" | "bottom"*

```jsx
/* ./src/App.js */

import React from 'react';
import { Row, Col } from 'antd';

function MyCol({ span, offset }) {
  const opacity = Math.round(Math.random() * 10) / 10;
  return (
    <Col span={span} offset={offset}>
      <div style={{ height: 50, backgroundColor: 'red', opacity }} />
    </Col>
  );
}

export default function App() {
  return (
    <div className="App">
      <Row
        style={{
          height: 300,
        }}
        type="flex"
        justify="start"
        align="top"
      >
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
      </Row>
    </div>
  );
}
```

## Layout

### import { Layout } from 'antd';

+ 참고: [https://ant.design/components/layout/](https://ant.design/components/layout/)

```jsx
import React from 'react';
import { Layout } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

export default function App() {
  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}
```