# Props 와 State

Props 는 컴포넌트 외부에서 컴포넌트에게 주는 데이터입니다. 
State 는 컴포넌트 내부에서 변경할 수 있는 데이터입니다. 
둘 다 변경이 발생하면, 랜더가 다시 일어날 수 있습니다. 

<br>

## Render 함수

Props 와 State를 바탕으로 컴포넌트를 그립니다.
그리고 Props 와 State 가 변경되면, 컴포넌트를 다시 그립니다. 
컴포넌트를 그리는 방법을 기술하는 함수가 랜더 함수 입니다. 

<br>

## function 컴포넌트

```jsx
<!-- ex8-1.html : 함수로 리액트 컴포넌트 만들기 -->
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
      function Component(props) {
        return (
          <div>
            <h1>{props.message} 이것은 함수로 만든 컴포넌트 입니다.</h1>
          </div>
        );
      }

      ReactDOM.render(
        <Component message="안녕하세요!!!" />,
        document.querySelector('#root'),
      );
    </script>
  </body>
</html>
```

```jsx
const dom = document.getElementById("root");

class ClassComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isClick: false
        };
    }
    // state = {
    //	isClick: false
	// }
    render() {
        console.log(this.state.isClick);
        if (this.state.isClick === false) {
            return ( 
                <div>
                    <h1>제목</h1>
                    <button 
                        onClick={() => {
                            this.setState({
                                isClick: true
                            });
                        }}>
                        클릭
                    </button>
                </div>
            );
        }
        return ( 
        	<div>
            	<h1>제목</h1>
            </div>
        );
    }
}

const FunctionalComponent = props => (
    function click() {
        console.log("clicked");
    }
    return(
	<div>
    	<h1>제목</h1>
        <p>{typeof props.a} {props.a}</p>
        <p>{props.children}</p>
        <button onClick={click}>클릭</button>
    </div>
    );
);

ReactDOM.render(
	<div>
    	<ClassComponent a="hi" />
        <ClassComponent></ClassComponent>
        <FunctionalComponent a="hello" />
        <FunctionalComponent a={37} />
        <FunctionalComponent a={() => {}} />
        <FunctionalComponent>children</FunctionalComponent>
    </div>,
    dom
);
```

<br>

### &lt;Component p="프롭스" /&gt; 

+ props 설정

### props.p 로 접근

+ props 사용

```jsx
function Component(props) {
    return (
        <div>
            <h1>{props.message} 이것은 함수로 만든 컴포넌트입니다.</h1>
        </div>
    )
}
```

<br>

## Class 컴포넌트 extends React.Component

```jsx
<!-- ex8-2.html : 클래스로 리액트 컴포넌트 만들기 -->
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
      class Component extends React.Component {
        render() {
          return (
            <div>
              <h1>
                {this.props.message} 이것은 클래스를 상속하여 만든 컴포넌트
                입니다.
              </h1>
            </div>
          );
        }
      }

      ReactDOM.render(
        <Component message="안녕하세요!!!" />,
        document.querySelector('#root'),
      );
    </script>
  </body>
</html>
```

<br>

### &lt;Component p="프롭스" /&gt; 

+ props 설정

### props.p 로 접근

+ props 사용

```jsx
class Component extends React.Component {
    render() {
        return (
        	<div>{this.props.p}</div>
        );
    }
}
```

<br>

### defaultProps

```jsx
<!-- ex9.html : defaultProps 설정 -->
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
      class Component extends React.Component {
        static defaultProps = {
          message: '안녕하세요!!!',
        };
        render() {
          return (
            <div>
              {this.props.message} 이것은 클래스를 상속하여 만든 컴포넌트
              입니다.
            </div>
          );
        }
      }

      //   Component.defaultProps = {
      //     message: '안녕하세요!!!',
      //   };

      ReactDOM.render(<Component />, document.querySelector('#root'));
    </script>
  </body>
</html>
```

<br>

### state = {}; constructor

+ state 초기값 설정

### this.state.s 로 접근

+ state 사용

```jsx
class Component extends React.Component {
  state = {
    s: '스테이트'
  };
  render() {
    return (
      <div>{this.state.s}</div>
    );
  }
}
```

```jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {s: '스테이트'};
  }
  render() {
    return (
      <div>{this.state.s}</div>
    );
  }
}
```

<br>

### this.setState({s: '새 스테이트'});

+ state 값 업데이트

```jsx
class Component extends React.Component {
  state = {
    s: '스테이트'
  };
  render() {
    return (
      <div onClick={() => {
        this.setState({s: '새 스테이트'});
      }}>{this.state.s}</div>
    );
  }
}
```

