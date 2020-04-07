# React Hooks

## Hooks (New in React 16.8)

### 필수

+ **useState**
+ **useEffect**
+ **useContext(Context API에서 다룸)**

### 추가

+ useReducer
+ useCallback, useMemo
+ useRef, useImperativeHandle
+ useLayoutEffect
+ useDebugValue

참고: [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)

XSTATE: [https://xstate.js.org/docs/](https://xstate.js.org/docs/)

<br>

## 실습

```bash
$ npx create-react-app react-hooks-example
```

### *const {count} = this.state; this.setState({count: count + 1});*

+ ./src에 components 폴더 생성

+ ./src/components에 Example1.jsx 생성

  ```jsx
  /* ./src/components/Example1.jsx */
  
  import React from "react";
  
  export default class Example1 extends React.Component {
    state = {
      count: 0,
    };
  
    render() {
      const { count } = this.state;
  
      return (
        <div>
          <p>You clicked {count} times</p>
          <button
            onClick={() => {
              this.setState({ count: count + 1 });
            }}
          >
            Click me
          </button>
        </div>
      );
    }
  }
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React from "react";
  import "./App.css";
  import Example1 from "./components/Example1";
  
  function App() {
    return (
      <div className="App">
        <Example1 />
      </div>
    );
  }
  
  export default App;
  ```

### :star:*const [count, setCount] = useState(0);*

*const [스테이트 값, 스테이트 변경 함수] = useState(스테이트 초기값);*

+ ./src/components에 Example2.jsx 생성

  ```jsx
  /* ./src/components/Example2.jsx */
  
  import React, { useState } from "react";
  
  export default function Example2() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Usong");
    // state = {
    //   count: 0,
    // };
    // const { count } = this.state;
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
  ```

### *const [state, setState] = useState({count: 0});*

*const [스테이트 값, 스테이트 변경 함수] = useState(스테이트 초기값);*

+ ./src/components에 Example3.jsx 생성

  ```jsx
  import React, { useState } from "react";
  
  export default function Example3() {
    const [state, setState] = useState({ count: 0 });
    // state = {
    //   count: 0,
    // };
    // const { count } = this.state;
  
    return (
      <div>
        <p>You clicked {state.count} times</p>
        <button
          onClick={() => {
            setState({ count: state.count + 1 });
          }}
        >
          Click me
        </button>
      </div>
    );
  }
  ```

<br>

> **Functional Component = Stateless Component = State Functional Component**

> **Functional Component != Stateless Component**
> *because state hook* 

+ 컴포넌트 사이에서 상태와 관련된 로직을 재사용하기 어려움
  + 컨테이너 방식 말고, 상태와 관련된 로직
+ 복잡한 컴포넌트들은 이해하기 어려움
+ Class는 사람과 기계를 혼동시킴
  + 컴파일 단계에서 코드를 최적화하기 어렵게 만듦
+ this.state는 로직에서 레퍼런스를 공유하기 때문에 문제 발생 가능

<br>

## UseState

+ state

## UseEffect

+ componentDidMount
+ componentDidUpdate
+ componentWillUnmount

참고: [https://rinae.dev/posts/a-complete-guide-to-useeffect-ko/](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko/)

### componentWillUnmount, componentDidUpdate

+ ./src/components에 Example4.jsx 생성

  ```jsx
  /* ./src/components/Example4.jsx */
  
  import React from "react";
  
  export default class Exmplae4 extends React.Component {
    state = { count: 0 };
    componentDidMount() {
      console.log("componentDidMount", this.state.count);
    }
  
    componentDidUpdate() {
      console.log("componentDidUpdate", this.state.count);
    }
  
    render() {
      const { count } = this.state;
      return (
        <div>
          <p>You clicked {count} times</p>
          <button
            onClick={() => {
              this.setState({ count: count + 1 });
            }}
          >
            Click me
          </button>
        </div>
      );
    }
  }
  ```

### useEffect(() => {});

+ ./src/components에 Example5.jsx 생성

  ```jsx
  /* ./src/components/Example5.jsx */
  
  import React, { useState, useEffect } from "react";
  
  export default function Example5() {
    const [count, setCount] = useState(0);
  
    //   componentDidMount() {
    //     console.log("componentDidMount", this.state.count);
    //   }
    //   componentDidUpdate() {
    //     console.log("componentDidUpdate", this.state.count);
    //   }
  
    useEffect(() => {
      console.log("componentDidMount", count);
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
  ```

  ```jsx
  /* ./src/components/Example5.jsx */
  
  import React, { useState, useEffect } from "react";
  
  export default function Example5() {
    const [count, setCount] = useState(0);
  
    //   componentDidMount() {
    //     console.log("componentDidMount", this.state.count);
    //   }
    //   componentDidUpdate() {
    //     console.log("componentDidUpdate", this.state.count);
    //   }
  
    useEffect(() => {
      // 랜더가 끝난 후 실행
      console.log("componentDidMount", count);
    }, []);
  
    useEffect(() => {
      console.log("componentDidUpdate", count);
    }, [count]);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
  ```

### componentWillUnmount

#### 마운트 해제

+ 아래 메서드는 컴포넌트가 DOM 상에서 제거될 때에 호출

  ```jsx
  componentWillUnMount()
  ```

  componentWillUnmount()는 컴포넌트가 마운트 해제되어 제거되기 직전에 호출. 이 메서드 내에서 타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행.

  이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 **setState()를 호출하면 안됨** 컴포넌트가 인스턴스 마운트 해제되고 나면, 절대로 다시 마운트되지 않음

+ 참고: [https://ko.reactjs.org/docs/react-component.html#unmounting](https://ko.reactjs.org/docs/react-component.html#unmounting)

#### 예제1

+ ./src/components/Example5.jsx 수정

  ```jsx
  /* ./src/components/Example5.jsx */
  
  import React, { useState, useEffect } from "react";
  
  export default function Example5() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      console.log("a", count); // 새로운 값
      return () => {
        // cleanup
        console.log("b", count); // 예전 값
      };
    }, [count]);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
  
  ```

+ cleanup은 이전 것을 청소하고 다음 것을 실행

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React, { useState, useEffect } from "react";
  import "./App.css";
  import Example1 from "./components/Example1";
  import Example2 from "./components/Example2";
  import Example5 from "./components/Example5";
  
  function App() {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }, []);
    return (
      <div className="App">
        <Example1 />
        <Example2 />
        {visible && <Example5 />}
      </div>
    );
  }
  
  export default App;
  ```

#### 예제2

+ ./src/components에 Example6.jsx 생성

  ```jsx
  /* ./src/components/Example6.jsx */
  
  import React from "react";
  
  export default class Example6 extends React.Component {
    state = {
      time: new Date(),
    };
  
    _timer = null;
  
    componentDidMount() {
      this._timer = setInterval(() => {
        this.setState({ time: new Date() });
      }, 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this._timer);
    }
  
    render() {
      const { time } = this.state;
      return <div>{time.toISOString()}</div>;
    }
  }
  ```

### UseEffect 자세히 알아보기

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    })
    return (
        <div>
			<p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            	Click me
            </button>
        </div>
    )
}
```

#### 첫번째 렌더링

+ **리액트**: state가 0일 때의 UI를 보여줘
+ **컴포넌트**
  + 여기 렌더링 결과물로 <p>You Clicked 0 times</p>가 있어.
  + 그리고 모든 처리가 끝나고 이 이펙트를 실행하는 것을 잊지 마: () => { document.title = 'You clicked 0 times' }.
+ **리액트**: 좋아. UI를 업데이트 하겠어. 이봐 브라우저, 나 DOM에 뭘 좀 추가하려고 해.
+ **브라우저: ** 좋아, 화면에 그려줄게
+ **리액트**: 좋아 이제 컴포넌트 네가 준 이펙트를 실행할거야.
  + () => { document.title = 'You clicked 0 times' } 를 실행하는 중.

#### 클릭 후, 렌더링

+ **컴포넌트**: 이봐 리액트, 내 상태를 1 로 변경해줘.

+ **리액트**: 상태가 1 일때의 UI를 줘.

+ **컴포넌트**

  + 여기 렌더링 결과물로 <p>You Clicked 0 times</p>가 있어.

  + 그리고 모든 처리가 끝나고 이 이펙트를 실행하는 것을 잊지 마: () => { document.title = 'You clicked 0 times' }.

+ **리액트**: 좋아. UI를 업데이트 하겠어. 이봐 브라우저, 나 DOM에 뭘 좀 추가하려고 해.

+ **브라우저: ** 좋아, 화면에 그려줄게

+ **리액트**: 좋아 이제 컴포넌트 네가 준 이펙트를 실행할거야.

  + () => { document.title = 'You clicked 0 times' } 를 실행하는 중.

<br>

### 나만의 훅 만들기

+ ./src에 hooks 폴더 생성

+ ./src/hooks에 useWindowWidth.js 생성

  ```jsx
  /* ./src/hooks/useWindowWidth.js */
  
  import { useState, useEffect } from "react";
  
  export default function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const resize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", resize);
  
      return () => {
        window.removeEventListener("resize", resize);
      };
    }, []);
  
    return width;
  }
  
  // const width = useWindowWidth();
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React, { useState, useEffect } from "react";
  import "./App.css";
  import Example1 from "./components/Example1";
  import Example2 from "./components/Example2";
  import Example5 from "./components/Example5";
  import Example6 from "./components/Example6";
  import useWindowWidth from "./hooks/useWindowWidth";
  
  function App() {
    const width = useWindowWidth();
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }, []);
    return (
      <div className="App">
        <h1>{width}</h1>
        <Example1 />
        <Example2 />
        {visible && <Example5 />}
        <Example6 />
      </div>
    );
  }
  
  export default App;
  ```

<br>

## useHasMounted vs withHasMounted

### withHasMounted = hocs

Wrapper를 만든 후 Wrapper가 변경되면 prop로 바꿔줌

+ ./src에 hocs 폴더 생성

+ ./src/hocs에 withHasMounted.js 생성

  ```jsx
  /* ./src/hocs/withHasMounted.js */
  
  import React from "react";
  
  export default function withHasMounted(Component) {
    class WrapperComponent extends React.Component {
      state = {
        hasMounted: false,
      };
      componentDidMounted() {
        this.setState({ hasMounted: true });
      }
      render() {
        return <Component {...this.props} hasMounted={this.state.hasMounted} />;
      }
    }
  
    WrapperComponent.displayName = `widthHasMounted(${Component.name})`;
  
    return WrapperComponent;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React, { useState, useEffect } from "react";
  import "./App.css";
  import Example1 from "./components/Example1";
  import Example2 from "./components/Example2";
  import Example5 from "./components/Example5";
  import useWindowWidth from "./hooks/useWindowWidth";
  import withHasMounted from "./hocs/withHasMounted";
  
  function App({ hasMounted }) {
    console.log(hasMounted);
    const width = useWindowWidth();
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }, []);
    return (
      <div className="App">
        <h1>{width}</h1>
        <Example1 />
        <Example2 />
        {visible && <Example5 />}
      </div>
    );
  }
  
  export default withHasMounted(App);
  ```

### :star:useHasMounted = hooks

정의된 로직을 통해 return 받은 state 값으로 어디서든 쉽게 사용 가능(state를 hook으로 변경)

+ ./src/hooks에 useHasMounted.js 생성

  ```jsx
  /* ./src/hooks/useHasMounted.js */
  
  import { useState, useEffect } from "react";
  
  export default function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => {
      setHasMounted(true);
    }, []);
    return hasMounted;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  /* ./src/App.js */
  
  import React, { useState, useEffect } from "react";
  import "./App.css";
  import Example1 from "./components/Example1";
  import Example2 from "./components/Example2";
  import Example5 from "./components/Example5";
  import useWindowWidth from "./hooks/useWindowWidth";
  import withHasMounted from "./hocs/withHasMounted";
  import useHasMounted from "./hooks/useHasMounted";
  
  function App() {
    const hasMounted = useHasMounted();
    console.log(hasMounted);
    const width = useWindowWidth();
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }, []);
    return (
      <div className="App">
        <h1>{width}</h1>
        <Example1 />
        <Example2 />
        {visible && <Example5 />}
      </div>
    );
  }
  
  export default App;
  ```

  