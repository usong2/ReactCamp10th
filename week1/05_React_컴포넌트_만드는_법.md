# React 컴포넌트 만드는 법

## Hooks 이전

+ 컴포넌트 내부에 상태가 있다면?
  + class
+ 컴포넌트 내부에 상태가 없다면?
  + 라이프사이클을 사용해야 한다면?
    + class
  + 라이프사이클에 관계 없다면?
    + function

<br>

## Hooks 이후

+ class
+ function

<br>

## class 컴포넌트

```jsx
import React from 'react';

class ClassComponent from React.Component {
  render() {
    return (<div>Hello</div>);
  }
}

// 사용
<ClassComponent />
```

<br>

```html
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
      
      class ClassComponent extends React.Component {
      	render() {
      		return (
      			<div>
      				<h1>제목</h1>
      			</div>
      		);
      	}
      }
      
      const FunctionalComponent = () => (
      	<div>
      		<h1>제목</h1>
     	</div>
      );
      
      ReactDOM.render(
      	<div>
      		<ClassComponent /><FunctionalComponent />
       	<div/>, 
      dom);
    </script>
  </body>
</html>
```

