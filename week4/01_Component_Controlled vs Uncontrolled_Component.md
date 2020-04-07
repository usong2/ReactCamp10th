# Controlled Component vs UnControlled Component

```bash
$ npx create-react-app controlled-uncontrolled
```

<br>

## 상태를 가지고 있는 엘리먼트

+ input
+ select
+ textarea
+ ...

<br>

## 엘리먼트의 '상태'를 누가 관리하느냐

+ 엘리먼트를 가지고 있는 컴포넌트가 관리
  + Controlled
+ 엘리먼트의 상태를 관리하지 않고, 엘리먼트의 참조만 컴포넌트가 소유
  + Uncontrolled

<br>

## Controlled Components

+ 참고: [https://reactjs.org/docs/forms.html#controlled-components](https://reactjs.org/docs/forms.html#controlled-components)

### Controlled - constructor 사용

+ ./src에 components 폴더 생성

+ ./src/components에 Controlled.jsx 생성

  ```jsx
  /* ./src/components/Controlled.jsx */
  
  import React from "react";
  
  export default class Controlled extends React.Component {
    state = { value: "" };
  
    constructor() {
      super();
      this._change = this._change.bind(this);
    }
  
    render() {
      return (
        <div>
          <input value={this.state.value} onChange={this._change} />
        </div>
      );
    }
  
    _change(e) {
      // console.log(e.target.value);
      this.setState({ value: e.target.value });
    }
  }
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React from "react";
  import "./App.css";
  import Controlled from "./components/Controlled";
  
  function App() {
    return (
      <div className="App">
        <Controlled />
      </div>
    );
  }
  
  export default App;
  ```

### Controlled - 화살표 함수 사용

+ ./src/components/Controlled.jsx 수정

  ```jsx
  /* ./src/components/Controlled.jsx */
  
  import React from "react";
  
  export default class Controlled extends React.Component {
    state = { value: "" };
  
    render() {
      return (
        <div>
          <input value={this.state.value} onChange={this._change} />
        </div>
      );
    }
  
    _change = (e) => {
      // console.log(e.target.value);
      this.setState({ value: e.target.value });
    };
  }
  ```

### Controlled - decorator 사용

+ ./src/components/Controlled.jsx 수정

+ TypeScript 사용시 decorator 사용

  ```jsx
  /* ./src/components/Controlled.jsx */
  
  import React from "react";
  
  export default class Controlled extends React.Component {
    state = { value: "" };
  
    //   constructor() {
    //     super();
    //     this._change = this._change.bind(this);
    //   }
  
    render() {
      return (
        <div>
          <input value={this.state.value} onChange={this._change} />
        </div>
      );
    }
  
    @autobind
    _change(e) {
      // console.log(e.target.value);
      this.setState({ value: e.target.value });
    };
  }
  ```

### Controlled - state 전송

+ ./src/components/Controlled.jsx 수정

  ```jsx
  /* ./src/components/Controlled.jsx */
  
  import React from "react";
  
  export default class Controlled extends React.Component {
    state = { value: "" };
  
    render() {
      const { value } = this.state;
      return (
        <div>
          <input value={this.state.value} onChange={this._change} />
          <button onClick={this._click}>전송</button>
        </div>
      );
    }
  
    _change = (e) => {
      this.setState({ value: e.target.value });
    };
  
    _click = () => {
      console.log("최종 결과", this.state.value);
    };
  }
  ```

<br>

## Uncontrolled Components

+ 참고: [https://reactjs.org/docs/uncontrolled-components.html](https://reactjs.org/docs/uncontrolled-components.html)

### Uncontrolled

+ ./src/components에 Uncontrolled.jsx 생성

  ```jsx
  /* ./src/components/Uncontrolled.jsx */
  
  import React from "react";
  
  export default class Uncontrolled extends React.Component {
    inputRef = React.createRef();
  
    render() {
      return (
        <div>
          <input ref={this.inputRef} />
          <button onClick={this.click}>전송</button>
        </div>
      );
    }
    click = () => {
      // console.log(this.inputRef);
      // console.log(this.inputRef.current);
      console.log(this.inputRef.current.value);
    };
  }
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React from "react";
  import "./App.css";
  import Uncontrolled from "./components/Uncontrolled";
  
  function App() {
    return (
      <div className="App">
        <Uncontrolled />
      </div>
    );
  }
  
  export default App;
  ```

  

