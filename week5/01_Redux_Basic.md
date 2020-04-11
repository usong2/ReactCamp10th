# Redux Basic

## 컴포넌트 간 통신

+ 컴포넌트 사용 시에 무조건 props로만 통신이 가능

### 하위 컴포넌트를 변경하기

#### A의 button을 클릭하여 E를 변경하려면

```jsx
// A 컴포넌트
<div>
    <B />
    <button>클릭</button>
</div>
```

```jsx
// B 컴포넌트
<div>
    <C />
</div>
```

```jsx
// C 컴포넌트
<div>
    <D />
</div>
```

```jsx
// D 컴포넌트
<div>
    <E />
</div>
```

```jsx
// E 컴포넌트
<div>
    {props.value}
</div>
```

1. &lt;A /&gt; 컴포넌트에서 button에 onClick 이벤트를 만들고
2. button을 클릭하면, &lt;A /&gt;의 state를 변경하여, &lt;B /&gt;로 내려주는 props를 변경
3. &lt;B /&gt;의 props가 변경되면, &lt;C /&gt;의 props에 전달
4. &lt;C /&gt;의 props가 변경되면, &lt;D /&gt;의 props에 전달
5. &lt;D /&gt;의 props가 변경되면, &lt;E /&gt;의 props에 전달

```jsx
import React from "react";

class A extends React.Component {
  state = {
    value: "아직 안바뀜"
  };

  render() {
    console.log("A render");
    return (
      <div>
        <B {...this.state} />
        <button onClick={this._click}>E 의 값을 바꾸기</button>
      </div>
    );
  }

  _click = () => {
    this.setState({
      value: "E 의 값을 변경"
    });
  };
}

export default A;
```

```jsx
const B = props => (
  <div>
    <p>여긴 B</p>
    <C {...props} />
  </div>
);

const C = props => (
  <div>
    <p>여긴 C</p>
    <D {...props} />
  </div>
);

const D = props => (
  <div>
    <p>여긴 D</p>
    <E {...props} />
  </div>
);

const E = props => (
  <div>
    <p>여긴 E</p>
    <h3>{props.value}</h3>
  </div>
);
```

### 상위 컴포넌트를 변경하기

#### E의 button을 클릭하여 A의 p를 변경하려면

```jsx
// A 컴포넌트
<div>
    <B />
    <p>{state.value}</p>
</div>
```

```jsx
// B 컴포넌트
<div>
    <C />
</div>
```

```jsx
// C 컴포넌트
<div>
    <D />
</div>
```

```jsx
// D 컴포넌트
<div>
    <E />
</div>
```

```jsx
// E 컴포넌트
<div>
    <button>클릭</button>
</div>
```

1. &lt;A /&gt;에 함수를 만들고, 그 함수 안에 state를 변경하도록 구현, 그 변경으로 인해 p 안의 내용을 변경.
2. 만들어진 함수를 props에 넣어서, &lt;B /&gt;로 전달
3. &lt;B /&gt;의 props의 함수를 &lt;C /&gt;의 props로 전달
4. &lt;C /&gt;의 props의 함수를 &lt;D /&gt;의 props로 전달
5. &lt;D /&gt;의 props의 함수를 &lt;E /&gt;의 props로 전달, &lt;E /&gt;에서 클릭하면 props로 받은 함수를 실행

```jsx
import React from "react";

class A extends React.Component {
  state = {
    value: "아직 안바뀜"
  };

  render() {
    console.log("A render");
    return (
      <div>
        <h3>{this.state.value}</h3>
        <B change={this.change} />
      </div>
    );
  }

  change = () => {
    this.setState({
      value: "A 의 값을 변경"
    });
  };
}

export default A;
```

```jsx
const B = props => (
  <div>
    <p>여긴 B</p>
    <C {...props} />
  </div>
);

const C = props => (
  <div>
    <p>여긴 C</p>
    <D {...props} />
  </div>
);

const D = props => (
  <div>
    <p>여긴 D</p>
    <E {...props} />
  </div>
);

const E = props => {
  function click() {
    props.change();
  }
  return (
    <div>
      <p>여긴 E</p>
      <button onClick={click}>클릭</button>
    </div>
  );
};
```

<br>

## Redux 개요

### Context API

+ 부모가 어떠한 데이터를 가지고 있으면 자식 누구든 가져올 수 있음
+ **문제는 이렇게 코딩하여 state를 관리하기가 너무 복잡함**
+ 복잡함을 해결하기 위한 그 사이의 개념은 Redux
+ Redux는 어떤 아키텍쳐 패턴의 구현체로 엄청난 API가 없고 이렇게 작업하면 편할 것이다라는 개념
+ 이 개념을 Flux 아키텍쳐라고 함
  참고: [http://haruair.github.io/flux/docs/overview.html](http://haruair.github.io/flux/docs/overview.html) 
+ 하지만 Redux는 Flux의 구현체이지만 완벽하게 똑같지 않음
+ Flux의 개념을 바탕으로 React에서 사용할 수 있도록 만들어 준 것이 Redux

### Component - Communication

+ Context API와 Redux의 개념이 없다면 부모 노드로 이동했다가 자식 노드로 하나씩 이동해야함 
  [https://cloud.protopie.io/p/irg8jMXuGov/3](https://cloud.protopie.io/p/irg8jMXuGov/3)

### Component - Communication - Redux

+ Redux를 사용하면 store라는 개념을 하나 만들 수 있음 
+ store에는 state와 함수가 종합적으로 담겨있음
+ store에 어떠한 함수를 실행하라고 명령하면 실행하며 store가 자신의 state를 변경
+ 즉, state를 변경하는 행위를 던지면 store는 그것을 받아 state를 변경
  [https://cloud.protopie.io/p/Ycc3KrJvjgA/2](https://cloud.protopie.io/p/Ycc3KrJvjgA/2)

### Redux

![https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/3964190/redux-after.png](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/3964190/redux-after.png)

### &quot;(1)단일 스토어를 만드는 법&quot;과, &quot;(2)리액트에서 스토어 사용하는 법&quot;

+ **단일** 스토어다!
+ [만들기] 단일 스토어 사용 준비하기
  + import **redux**
  + *액션* 을 정의하고,
  + *액션* 을 사용하는 *리듀서* 를 만들고
  + *리듀서* 들을 합친다.
  + 최종 합쳐진 *리듀서* 를 인자로, 단일 스토어를 만든다.
+ [사용하기] 준비한 스토어를 리액트 컴포넌트에서 사용하기
  + import **react-redux**
  + connect 함수를 이용해서 컴포넌트에 연결

<br>

> store가 여러 개 있는 것은 mobX
> mobX는 store 단위로 자신들의 로직을 정리하여 분리
> redux는 단일 스토어가 아니므로 다른 방식으로 자신들을 분리하는데 하나의 스토어를 분리해서 쓸 수 있도록 함

<br>

## Redux 설치

+ 다른 package가 부수적으로 변하더라도 Redux 패키지는 큰 변화가 없음
+ store를 만드는 개념은 어디에서든 똑같이 사용되고 그것을 어떻게 사용되는지에 따라서 여러가지 API가 추가될 수 있음
+ 

```bash
$ npx create-react-app redux-start
$ cd redux-start
$ npm i redux
```

<br>

## Action - 액션

+ 글로벌에 있는 어떤 store의 state를 변경할 때 action을 던짐
+ action은 무조건 글로벌 state를 변경할 수 있는 행위를 할 때 action을 날림
+ ex) store의 state에 loading이 있을 때 loading은 true이거나 false일 수 있음
        false일 때 loading을 true로 변경하려면 loadingStart와 같은 action을 만들고
        false로 변경하려면 loadingEnd와 같은 action을 만들어 던져줌

<br>

### 리덕스의 액션이란?

+ 액션은 사실 그냥 객체(object)
+ 두 가지 형태의 액션이 있음
  + { type: 'TEST' } // payload 없는 액션
  + { type: 'TEST', params: 'hello' } // payload 있는 액션
+ type 만이 필수 프로퍼티이며, type은 문자열

### 리덕스의 액션 생성자란?

```jsx
function 액션생성자(...args) { return 액션; }
```

+ 액션을 생성하는 함수를 &quot;액션 생성자 (Action Creator)&quot; 라고 함
+ 함수를 통해 액션을 생성해서, 액션 객체를 리턴
+ createTest('hello'); // { type: 'TEST', params: 'hello' } 리턴

### 리덕스의 액션이 하는 일

+ 액션 생성자를 통해 액션을 만들어 냄
+ 만들어낸 액션 객체를 리덕스 스토어에 보냄
+ 리덕스 스토어가 액션 객체를 받으면 스토어의 상태 값이 변경
+ 변경된 상태 값에 의해 상태를 이용하고 있는 컴포넌트가 변경
+ 액션은 스토어에 보내는 일종의 인풋이라 생각할 수 있음

### 액션을 준비하기 위해서는?

+ 액션의 타입을 정의하여 변수로 빼는 단계
  + 강제는 아니므로 안해도 됨
  + 그냥 타입을 문자열로 넣기에는 실수를 유발할 가능성이 큼
  + 미리 정의한 변수를 사용하면, 스펠링 주의를 덜 기울여도 됨
+ 액션 객체를 만들어 내는 함수를 만드는 단계
  + 하나의 액션 객체를 만들기 위해 하나의 함수를 만들어 냄
  + 액션의 타입은 미리 정의한 타입 변수로부터 가져와서 사용

### 액션 준비 코드

+ ./src에 actions.js 생성

  ```js
  // actions.js
  
  // 액션의 type 정의
  // 액션의 타입 => 액션 생성자 이름
  // ADD_TODO => addTodo
  
  export const ADD_TODO = "ADD_TODO";
  
  // 액션 생성자
  // 액션의 타입은 미리 정의한 타입으로부터 가져와서 사용하며,
  // 사용자가 인자로 주지 않습니다.
  export function addTodo(text) {
    return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
  }
  
  const START_LOADING = "START_LOADING"; // 액션
  
  const startLoading = () => ({ type: startLoading }); // 액션 생성자
  ```

<br>

## Reducers - 리듀서

+ 액션을 만들어 던지면 스토어에서 액션을 받아 나의 state를 변경하는 일이 생기는데 이러한 일을 해주는 함수를 Reducers 함수라고 함
+ 즉, 액션을 받아 새로운 state를 리턴

### 리덕스의 리듀서란?

+ 액션을 주면, 그 액션이 적용되어 달라진(안달라질 수도 있음) 결과를 만들어 줌.
+ 그냥 함수
  + Pure Function
  + Immutable(매번 새로운 레퍼런스를 가진 객체를 리턴)
    + Why?
      + 리듀서를 통해 스테이트가 달라졌음을 리덕스가 인지하는 방식

```jsx
function 리듀서(previusState, action) {
    return newState;
}
```

+ 액션을 받아서 스테이트를 리턴하는 구조
+ 인자로 들어오는 previousState와 리턴되는 newState는 다른 참조를 가지도록 해야함

### 리듀서 함수 만들기

+ ./src에 reducers.js 생성

```jsx
// reducers.js
import { ADD_TODO } from "./actions";

const initialState = [];

export function todoApp(previousState = initialState, action) {
  //   if (previousState === undefined) {
  //     //최초
  //     return [];
  //   }
  if (action.type === ADD_TODO) {
    return [
      ...previousState,
      {
        text: action.text,
        createAt: new Date().toISOString(),
      },
    ];
  }

  return previousState;
}
```

<br>

## createStore

*redux로 부터 import*

### 스토어를 만드는 함수

```jsx
const store = createStore(리듀서);
```

+ ```jsx
  createStore<S>(
  	reducer: Reducer<S>,
      preloadedState: S,
      enhancer?: StoreEnhancer<S>
  ): Store<S>;
  ```

### 스토어 만들기

+ ./src에 store.js 생성

  ```jsx
  // store.js
  
  import { createStore } from "redux";
  import { todoApp } from "./reducers";
  import { addTodo } from "./actions";
  
  export const store = createStore(todoApp);
  
  // console.log(store);
  
  // console.log(store.getState());
  
  // state 변경 시에 subscribe가 불림(index.js로 코드 이동)
  // store.subscribe(() => {
  //   console.log(store.getState());
  // });
  
  // store.dispatch(addTodo("API 만들기"));
  ```

+ ./src/index.js 수정

  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { store } from "./store";
  
  store.subscribe(() => {
    ReactDOM.render(<App store={store} />, document.getElementById("root"));
  });
  
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ ./src/App.js 수정

  ```jsx
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import { addTodo } from "./actions";
  
  function App({ store }) {
    function click() {
      store.dispatch(addTodo("Hello"));
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{JSON.stringify(store.getState())}</p>
          <button onClick={click}>add</button>
        </header>
      </div>
    );
  }
  
  export default App;
  ```

### store

+ store.**getState()**;
+ store.dispatch(액션);, store.**dispatch(액션생성자())**;
+ const unsubscribe = store.subscribe(() => {});
  + 리턴이 unsubscribe 라는 점!
  + unsubscribe(); 하면 제거
+ store.replaceReducer(다른리듀서);

<br>

## 로직을 추가하기

*action을 정의하고, action 생성자를 만들고, reducer를 수정*

### 예제

#### action 정의

```jsx
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}
```

#### action 생성자 생성

```jsx
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }; // { type: COMPLETE_TODO, index: index}
}
```

#### reducer 수정

```jsx
import { ADD_TODO, COMPLETE_TODO } from './actions';

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, completed: false }];
  }
  if (action.type === COMPLETE_TODO) {
    const newState = [];
    for (let i = 0; i < previousState.length; i++) {
      newState.push(
        i === action.index
          ? { ...previousState[i], completed: true }
          : { ...previousState[i] },
      );
    }
    return newState;
  }
  return previousState;
}
```

#### dispatch

```jsx
// store.js
import { todoApp } from './reducers';
import { createStore } from 'redux';
import { addTodo, completeTodo } from './actions';

const store = createStore(todoApp);
console.log(store);

console.log(store.getState());

setTimeout(() => {
  store.dispatch(addTodo('hello'));
  setTimeout(() => {
    store.dispatch(completeTodo(0));
  }, 1000);
}, 1000);

export default store;
```

### 실습

+ ./src/actions.js 수정

  ```jsx
  // actions.js
  
  // 액션의 type 정의
  // 액션의 타입 => 액션 생성자 이름
  // ADD_TODO => addTodo
  
  export const ADD_TODO = "ADD_TODO";
  export const COMPLETE_TODO = "COMPLETE_TODO";
  
  // 액션 생성자
  // 액션의 타입은 미리 정의한 타입으로부터 가져와서 사용하며,
  // 사용자가 인자로 주지 않습니다.
  export function addTodo(text) {
    return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
  }
  
  export function completeTodo(index) {
    return {
      type: COMPLETE_TODO,
      index,
    };
  }
  
  export const START_LOADING = "START_LOADING"; // 액션
  
  export const startLoading = () => ({ type: START_LOADING }); // 액션 생성자
  ```

+ ./src/reducers.js 수정

  ```jsx
  // reducers.js
  
  import { ADD_TODO, COMPLETE_TODO } from "./actions";
  
  const initialState = [];
  
  export function todoApp(previousState = initialState, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === ADD_TODO) {
      return [
        ...previousState,
        {
          text: action.text,
          createAt: new Date().toISOString(),
          done: false,
        },
      ];
    } else if (action.type === COMPLETE_TODO) {
      console.log(action);
      const { index } = action;
      // 원래 스테이트에 index 번째 있는 객체의 done을 true로 바꾸고, 새로운 배열을 리턴
      const newState = [...previousState];
      for (let i = 0; i <= newState.length; i++) {
        newState[index] = {
          ...newState[index],
          done: true,
        };
        return newState;
      }
    }
  
    return previousState;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  // App.js
  
  ```

import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import { addTodo, completeTodo } from "./actions";

  function App({ store }) {
    const inputRef = React.createRef();
    function click() {
      const text = inputRef.current.value;
      console.log(text);
      store.dispatch(addTodo(text));
    }
    const todos = store.getState();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <input ref={inputRef} />
            <button onClick={click}>add</button>
          </p>
          <ul>
            {todos.map((todo, index) => (
              <div key={index}>
                <h2>
                  {todo.text}{" "}
                  {todo.done ? (
                    "(완료)"
                  ) : (
                    <button
                      onClick={() => {
                        console.log(index);
                        store.dispatch(completeTodo(index));
                      }}
                    >
                      끝!
                    </button>
                  )}
                </h2>
              </div>
            ))}
          </ul>
        </header>
      </div>
    );
  }

  export default App;
  ```
  

### 애플리케이션이 커지면, state가 복잡해짐

​```jsx
[
    {
        text: 'Hello',
        completed: false
    }
]
  ```

↓

```jsx
{
  todos: [
    {
      text: 'Hello',
      completed: false
    }
  ],
  filter: 'SHOW_ALL'
}
```

+ 리듀서를 크게 만들고, state를 변경하는 모든 로직을 담을 수도 있음
+ 리듀서를 분할해서 만들고, 합치는 방법을 사용할 수 있음
  + **todos**만 변경하는 **액션들**을 처리하는 **A**라는 리듀서 함수를 만들고
  + **filter**만을 변경하는 **액션들**을 처리하는 **B**라는 리듀서 함수를 만들고 
  + **A**와 **B**를 합침

<br>

### 한 번에 다하는 리듀서

```jsx
import { ADD_TODO, COMPLETE_TODO } from './actions';

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return { todos: [], filter: 'SHOW_ALL' };
  }
  if (action.type === ADD_TODO) {
    return {
      todos: [...previousState.todos, { text: action.text, completed: false }],
      filter: previousState.filter,
    };
  }
  if (action.type === COMPLETE_TODO) {
    const todos = [];
    for (let i = 0; i < previousState.todos.length; i++) {
      todos.push(
        i === action.index
          ? { ...previousState.todos[i], completed: true }
          : { ...previousState.todos[i] },
      );
    }
    return { todos, filter: previousState.filter };
  }
  return previousState;
}
```

### 실습

+ ./src/actions.js 수정

  ```jsx
  // actions.js
  
  // 액션의 type 정의
  // 액션의 타입 => 액션 생성자 이름
  // ADD_TODO => addTodo
  
  export const ADD_TODO = "ADD_TODO";
  export const COMPLETE_TODO = "COMPLETE_TODO";
  
  // 액션 생성자
  // 액션의 타입은 미리 정의한 타입으로부터 가져와서 사용하며,
  // 사용자가 인자로 주지 않습니다.
  export function addTodo(text) {
    return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
  }
  
  export function completeTodo(index) {
    return {
      type: COMPLETE_TODO,
      index,
    };
  }
  
  export const START_LOADING = "START_LOADING"; // 액션
  export const END_LOADING = "END_LOADING"; // 액션
  
  export const startLoading = () => ({ type: START_LOADING }); // 액션 생성자
  export const endLoading = () => ({ type: END_LOADING }); // 액션 생성자
  ```

+ ./src/reducers.js 수정

  ```jsx
  // reducers.js
  
  import { ADD_TODO, COMPLETE_TODO, START_LOADING, END_LOADING } from "./actions";
  
  const initialState = {
    todos: [],
    isLoading: false,
  };
  
  export function todoApp(previousState = initialState, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === ADD_TODO) {
      return {
        ...previousState,
        todos: [
          ...previousState.todos,
          {
            text: action.text,
            createAt: new Date().toISOString(),
            done: false,
          },
        ],
      };
    } else if (action.type === COMPLETE_TODO) {
      const { index } = action;
      // 원래 스테이트에 index 번째 있는 객체의 done을 true로 바꾸고, 새로운 배열을 리턴
      const newState = {
        ...previousState,
      };
      newState.todos[index] = {
        ...newState.todos[index],
        done: true,
      };
      return newState;
    } else if (action.type === START_LOADING) {
      return {
        ...previousState,
        isLoading: true,
      };
    } else if (action.type === END_LOADING) {
      return {
        ...previousState,
        isLoading: false,
      };
    }
    return previousState;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  // App.js
  
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import { addTodo, completeTodo } from "./actions";
  
  function App({ store }) {
    const inputRef = React.createRef();
    function click() {
      const text = inputRef.current.value;
      console.log(text);
      store.dispatch(addTodo(text));
    }
    const todos = store.getState().todos;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <input ref={inputRef} />
            <button onClick={click}>add</button>
          </p>
          <ul>
            {todos.map((todo, index) => (
              <div key={index}>
                <h2>
                  {todo.text}{" "}
                  {todo.done ? (
                    "(완료)"
                  ) : (
                    <button
                      onClick={() => {
                        console.log(index);
                        store.dispatch(completeTodo(index));
                      }}
                    >
                      끝!
                    </button>
                  )}
                </h2>
              </div>
            ))}
          </ul>
        </header>
      </div>
    );
  }
  
  export default App;
  ```

### 리듀서 분리

```jsx
export function todos(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState.todos, { text: action.text, completed: false }];
  }
  if (action.type === COMPLETE_TODO) {
    const newState = [];
    for (let i = 0; i < previousState.length; i++) {
      newState.push(
        i === action.index
          ? { ...previousState[i], completed: true }
          : { ...previousState[i] },
      );
    }
    return newState;
  }
  return previousState;
}

export function filter(previousState, action) {
  if (previousState === undefined) {
    return 'SHOW_ALL';
  }
  return previousState;
}
```

### 실습

+ ./src/reducers.js 수정

  ```jsx
  // reducers.js
  import { ADD_TODO, COMPLETE_TODO, START_LOADING, END_LOADING } from "./actions";
  
  const initialTodos = [];
  
  export function todos(previousState = initialTodos, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === ADD_TODO) {
      return [
        ...previousState,
        {
          text: action.text,
          createAt: new Date().toISOString(),
          done: false,
        },
      ];
    } else if (action.type === COMPLETE_TODO) {
      const { index } = action;
      // 원래 스테이트에 index 번째 있는 객체의 done을 true로 바꾸고, 새로운 배열을 리턴
      const newState = [...previousState];
      newState[index] = {
        ...newState[index],
        done: true,
      };
      return newState;
    }
    return previousState;
  }
  
  const initialLoading = false;
  
  export function loading(previousState = initialLoading, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === START_LOADING) {
      return true;
    } else if (action.type === END_LOADING) {
      return false;
    }
    return previousState;
  }
  ```

### 리듀서 합치기

```jsx
export function todoApp(previousState = {}, action) {
  return {
    todos: todos(previousState.todos, action),
    filter: filter(previousState.filter, action),
  };
}
```

### 실습

+ ./src/reducers.js 수정

  ```jsx
  // reducers.js
  import { ADD_TODO, COMPLETE_TODO, START_LOADING, END_LOADING } from "./actions";
  
  const initialTodos = [];
  
  export function todoApp(previousState = {}, action) {
    return {
      todos: todos(previousState.todos, action),
      loading: loading(previousState.loading, action),
    };
  }
  
  export function todos(previousState = initialTodos, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === ADD_TODO) {
      return [
        ...previousState,
        {
          text: action.text,
          createAt: new Date().toISOString(),
          done: false,
        },
      ];
    } else if (action.type === COMPLETE_TODO) {
      const { index } = action;
      // 원래 스테이트에 index 번째 있는 객체의 done을 true로 바꾸고, 새로운 배열을 리턴
      const newState = [...previousState];
      newState[index] = {
        ...newState[index],
        done: true,
      };
      return newState;
    }
    return previousState;
  }
  
  const initialLoading = false;
  
  export function loading(previousState = initialLoading, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === START_LOADING) {
      return true;
    } else if (action.type === END_LOADING) {
      return false;
    }
    return previousState;
  }
  ```

<br>

## combineReducers

### 리덕스에서 제공하는 combineReducers 사용

```jsx
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  todos,
  filter,
});
```

### 실습

+ ./src/reducers.js 수정

  ```jsx
  // reducers.js
  
  import { ADD_TODO, COMPLETE_TODO, START_LOADING, END_LOADING } from "./actions";
  import { combineReducers } from "redux";
  
  const initialTodos = [];
  
  export function todoApp(previousState = {}, action) {
    return {
      todos: todos(previousState.todos, action),
      loading: loading(previousState.loading, action),
    };
  }
  
  export function todos(previousState = initialTodos, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === ADD_TODO) {
      return [
        ...previousState,
        {
          text: action.text,
          createAt: new Date().toISOString(),
          done: false,
        },
      ];
    } else if (action.type === COMPLETE_TODO) {
      const { index } = action;
      // 원래 스테이트에 index 번째 있는 객체의 done을 true로 바꾸고, 새로운 배열을 리턴
      const newState = [...previousState];
      newState[index] = {
        ...newState[index],
        done: true,
      };
      return newState;
    }
    return previousState;
  }
  
  const initialLoading = false;
  
  export function loading(previousState = initialLoading, action) {
    //   if (previousState === undefined) {
    //     //최초
    //     return [];
    //   }
    if (action.type === START_LOADING) {
      return true;
    } else if (action.type === END_LOADING) {
      return false;
    }
    return previousState;
  }
  
  export const reducers = combineReducers({
    todos: todos,
    loading: loading,
  });
  ```

+ ./src/store.js 수정

  ```jsx
  // store.js
  
  import { createStore } from "redux";
  import { reducers } from "./reducers";
  // import { addTodo } from "./actions";
  
  export const store = createStore(reducers);
  
  // console.log(store);
  
  // console.log(store.getState());
  
  // state 변경 시에 subscribe가 불림(index.js로 코드 이동)
  // store.subscribe(() => {
  //   console.log(store.getState());
  // });
  
  // store.dispatch(addTodo("API 만들기"));
  ```

<br>

## Redux를 React에 연결 - react-redux 無

*react-redux 안쓰고 연결*

1. 단일 store를 만들고
2. subscribe와 getState를 이용하여
3. 변경되는 state 데이터를 얻어
4. props로 계속 아래로 전달

+ componentDidMount - subscribe
+ componentWillUnmount - unsubscribe



### 실습

+ ./src/index.js 수정

  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { store } from "./store";
  
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ ./src/App.js 수정

  ```jsx
  // App.js
  
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import { addTodo, completeTodo } from "./actions";
  
  class App extends React.Component {
    state = this.props.store.getState();
    inputRef = React.createRef();
    click = () => {
      const text = this.inputRef.current.value;
      console.log(text);
      this.props.store.dispatch(addTodo(text));
    };
  
    unsubscribe;
  
    componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(() => {
        const state = this.props.store.getState();
        this.setState(state);
      });
    }
  
    componentWillUnmount() {
      this.unsubscribe();
    }
  
    render() {
      const { todos } = this.state;
      console.log(todos);
  
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <input ref={this.inputRef} />
              <button onClick={this.click}>add</button>
            </p>
            <ul>
              {todos.map((todo, index) => (
                <div key={index}>
                  <h2>
                    {todo.text}{" "}
                    {todo.done ? (
                      "(완료)"
                    ) : (
                      <button
                        onClick={() => {
                          console.log(index);
                          this.props.store.dispatch(completeTodo(index));
                        }}
                      >
                        끝!
                      </button>
                    )}
                  </h2>
                </div>
              ))}
            </ul>
          </header>
        </div>
      );
    }
  }
  
  export default App;
  ```

<br>

> store를 직접 props로 넣어주지 않고 어디서든 빼서 사용할 수 있다면 독립적으로 redux를 사용할 수 있는 상태가 될 수 있음

<br>

## ContextAPI

+ 참고: [https://ko.reactjs.org/docs/context.html](https://ko.reactjs.org/docs/context.html)

### useContext

```jsx
import React from 'react';

const ReduxContext = React.createContext();

export default ReduxContext;
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App2';
import * as serviceWorker from './serviceWorker';
import store from './store';
import ReduxContext from './context';

ReactDOM.render(
  <ReduxContext.Provider value={store}>
    <App />
  </ReduxContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

```jsx
import React, { useContext } from 'react';
import './App.css';
import { addTodo } from './actions';
import ReduxContext from './context';
import Button from './Button';

class App extends React.Component {
  static contextType = ReduxContext;
  _unsubscribe;
  state = this.context.getState();
  componentDidMount() {
    this._unsubscribe = this.context.subscribe(() => {
      this.setState(this.context.getState());
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{JSON.stringify(this.state)}</p>
          <Button />
        </header>
      </div>
    );
  }
}

export default App;
```

```jsx
import React, { useContext } from 'react';
import { addTodo } from './actions';
import ReduxContext from './context';

export default function Button() {
  const store = useContext(ReduxContext);
  return (
    <button
      onClick={() => {
        store.dispatch(addTodo('Hello'));
      }}
    >
      추가
    </button>
  );
}
```

### 실습

+ ./src에 contexts 폴더 생성

+ ./src/contexts에 ReduxContext.js 생성

  ```jsx
  // ReduxContext.js 
  
  import React from "react";
  
  const ReduxContext = React.createContext();
  
  export default ReduxContext;
  ```

+ ./src/index.js 수정

  ```jsx
  // index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { store } from "./store";
  import ReduxContext from "./contexts/ReduxContext";
  
  ReactDOM.render(
    <ReduxContext.Provider value={store}>
      <App />
    </ReduxContext.Provider>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ ./src/App.js 수정

  ```jsx
  // App.js
  
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import { completeTodo } from "./actions";
  import ReduxContext from "./contexts/ReduxContext";
  import TodoForm from "./components/TodoForm";
  
  class App extends React.Component {
    static contextType = ReduxContext;
  
    state = this.context.getState();
  
    unsubscribe;
  
    componentDidMount() {
      this.unsubscribe = this.context.subscribe(() => {
        const state = this.context.getState();
        this.setState(state);
      });
    }
  
    componentWillUnmount() {
      this.unsubscribe();
    }
  
    render() {
      const { todos } = this.state;
      console.log(todos);
  
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <TodoForm />
            <ul>
              {todos.map((todo, index) => (
                <div key={index}>
                  <h2>
                    {todo.text}{" "}
                    {todo.done ? (
                      "(완료)"
                    ) : (
                      <button
                        onClick={() => {
                          console.log(index);
                          this.context.dispatch(completeTodo(index));
                        }}
                      >
                        끝!
                      </button>
                    )}
                  </h2>
                </div>
              ))}
            </ul>
          </header>
        </div>
      );
    }
  }
  
  export default App;
  ```

+ ./src에 components 폴더 생성

+ ./src/components/TodoForm.jsx 생성

  ```jsx
  // TodoForm.jsx
  
  import React, { useContext } from "react";
  import { addTodo } from "../actions";
  import ReduxContext from "../contexts/ReduxContext";
  
  const TodoForm = () => {
    const inputRef = React.createRef();
    const context = useContext(ReduxContext);
    function click() {
      const text = inputRef.current.value;
      console.log(text);
      context.dispatch(addTodo(text));
    }
    return (
      <div
        style={{
          border: "1px solid red",
        }}
      >
        <input ref={inputRef} />
        <button onClick={click}>add</button>
      </div>
    );
  };
  
  export default TodoForm;
  ```


<br>

## Redux를 React에 연결 - react-redux 有

*react-redux 쓰고 연결*

+ Provider 컴포넌트를 제공
+ connect 함수를 통해 "컨테이너"를 만들어줌
  + 컨테이너는 스토어의 state와 dispatch(액션)를 연결한 컴포넌트에 props로 넣어주는 역할
  + 그렇다면 필요한 것은?
    + 어떤 state를 어떤 props에 연결할 것인지에 대한 정의
    + 어떤 dispatch(액션)을 어떤 props에 연결할 것인지에 대한 정의
    + 그 props를 보낼 컴포넌트를 정의

<br>

```bash
npm i react-redux
```

### Provider Component from react-redux

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App3';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

### Consumer from react-redux

```jsx
import React, { useContext, useEffect, useState } from 'react';
import { ReactReduxContext } from 'react-redux';
import './App.css';
import { addTodo } from './actions';
import Button from './Button';

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <p>{JSON.stringify(this.props.todos)}</p>
          <Button add={this.props.add} />
        </header>
      </div>
    );
  }
}
```

```jsx
import React from 'react';

export default function Button({ add }) {
  return <button onClick={() => add('hello')}>추가</button>;
}
```

```jsx
function AppContainer(props) {
  const { store } = useContext(ReactReduxContext);
  const [state, setState] = useState(store.getState());
  function add(text, dispatch) {
    console.log(text, dispatch);
    dispatch(addTodo(text));
  }
  useEffect(() => {
    const _unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      _unsubscribe();
    };
  });
  return (
    <App
      {...props}
      todos={state.todos}
      add={text => add(text, store.dispatch)}
    />
  );
}

export default AppContainer;
```

### connect function from react-redux

```jsx
import React from 'react';
import './App.css';
import { addTodo } from './actions';
import { connect } from 'react-redux';
import Button from './Button';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{JSON.stringify(this.props.todos)}</p>
          <Button add={this.props.add} />
        </header>
      </div>
    );
  }
}
```

```jsx
import React from 'react';

export default function Button({ add }) {
  return <button onClick={() => add('hello')}>추가</button>;
}
```

```jsx
const mapStateToProps = state => {
  return { todos: state.todos };
};

const mapDispatchToProps = dispatch => {
  return {
    add: text => {
      dispatch(addTodo(text));
    },
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
```

### mapStateToProps, mapDispatchToProps

```jsx
const mapStateToProps = state => {
  return { todos: state.todos };
};

const mapDispatchToProps = dispatch => {
  return {
    add: text => {
      dispatch(addTodo(text));
    },
  };
};
```

### 실습

+ ./src/index.js 수정

  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { store } from "./store";
  import { Provider } from "react-redux";
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ ./src/App.js 수정

  ```jsx
  // App.js
  
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import { completeTodo } from "./actions";
  import TodoForm from "./components/TodoForm";
  import { connect } from "react-redux";
  
  class App extends React.Component {
    render() {
      const { todos, completeTodo } = this.props;
      console.log(todos);
  
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <TodoForm />
            <ul>
              {todos.map((todo, index) => (
                <div key={index}>
                  <h2>
                    {todo.text}{" "}
                    {todo.done ? (
                      "(완료)"
                    ) : (
                      <button
                        onClick={() => {
                          console.log(index);
                          completeTodo(index);
                        }}
                      >
                        끝!
                      </button>
                    )}
                  </h2>
                </div>
              ))}
            </ul>
          </header>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    todos: state.todos,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    completeTodo: (index) => {
      dispatch(completeTodo(index));
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
  ```

+ ./src/components/TodoForm.jsx 수정

  ```jsx
  import React from "react";
  import { addTodo } from "../actions";
  import { connect } from "react-redux";
  
  const TodoForm = ({ addTodo }) => {
    const inputRef = React.createRef();
    function click() {
      const text = inputRef.current.value;
      console.log(text);
      addTodo(text);
    }
    return (
      <div
        style={{
          border: "1px solid red",
        }}
      >
        <input ref={inputRef} />
        <button onClick={click}>add</button>
      </div>
    );
  };
  
  export default connect(
    () => ({}),
    (dispatch) => ({
      addTodo: (text) => {
        dispatch(addTodo(text));
      },
    })
  )(TodoForm);
  ```

<br>

참고: [https://react-redux.js.org/](https://react-redux.js.org/)

<br>

## Hook으로 react-redux 다루기

