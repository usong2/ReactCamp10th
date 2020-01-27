# JSX

+ JSX 문법으로 작성된 코드는 순수한 JavaScript 로 컴파일하여 사용한다.
+ 누가 해주나요?? => babel : [https://babeljs.io/setup](https://babeljs.io/setup)

## JSX 문법 => React.createElement

```html
<!-- ex6.html : React.createElement => JSX -->
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
      //   React.createElement(
      //     type, // 태그 이름 문자열 | React 컴포넌트 | React.Fragment
      //     [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
      //     [...children] // 자식으로 넣어주는 요소들
      //   );

      // 1. 태그 이름 문자열 type
      //   ReactDOM.render(
      //     React.createElement('h1', null, `type 이 "태그 이름 문자열" 입니다.`),
      //     document.querySelector('#root'),
      //   );

      //   ReactDOM.render(
      //     <h1>type 이 "태그 이름 문자열" 입니다.</h1>,
      //     document.querySelector('#root'),
      //   );

      // 2. React 컴포넌트 type
      //   const Component = props => {
      //     return React.createElement('p', null, `나는 컴포넌트입니다.`);
      //   };

      //   ReactDOM.render(
      //     React.createElement(
      //       Component,
      //       null,
      //       `type 이 "React 컴포넌트" 입니다.`
      //     ),
      //     document.querySelector("#root")
      //   );

      //   const Component = props => {
      //     return <p>type 이 "React 컴포넌트" 입니다.</p>;
      //   };

      //   ReactDOM.render(<Component />, document.querySelector('#root'));

      // 3. React Fragment type
      //   ReactDOM.render(
      //     React.createElement(
      //       React.Fragment,
      //       null,
      //       `type 이 "React Fragment" 입니다.`
      //     ),
      //     document.querySelector("#root")
      //   );

      //   ReactDOM.render(
      //     <>`type 이 "React Fragment" 입니다.</>,
      //     document.querySelector('#root'),
      //   );

      // 4. props 를 통해 데이터를 주입
      //   const Component = props => {
      //     return React.createElement(
      //       'p',
      //       null,
      //       `message 는 "${props.message}" 입니다.`,
      //     );
      //   };

      //   ReactDOM.render(
      //     React.createElement(
      //       Component,
      //       { message: '이것은 메세지 입니다.' },
      //       null,
      //     ),
      //     document.querySelector('#root'),
      //   );

      //   const Component = props => {
      //     return <p>message 는 "{props.message}" 입니다.</p>;
      //   };

      //   ReactDOM.render(
      //     <Component message="이것은 메세지 입니다." />,
      //     document.querySelector('#root'),
      //   );

      // 5. props 에 들어가는 children
      //   const Component = props => {
      //     return React.createElement(
      //       'p',
      //       null,
      //       `message 는 "${props.message}" 입니다.`,
      //       `props.children 은 "${props.children}" 입니다.`,
      //     );
      //   };

      //   ReactDOM.render(
      //     React.createElement(
      //       Component,
      //       { message: '이것은 메세지 입니다.' },
      //       '이것은 children 입니다.',
      //     ),
      //     document.querySelector('#root'),
      //   );

      //   const Component = props => {
      //     return (
      //       <p>
      //         message 는 "{props.message}" 입니다. props.children 은 "
      //         {props.children}" 입니다.
      //       </p>
      //     );
      //   };

      //   ReactDOM.render(
      //     <Component message="이것은 메세지 입니다.">
      //       이것은 children 입니다.
      //     </Component>,
      //     document.querySelector('#root'),
      //   );

      // 6. 리액트 엘리먼트에 style 추가
      //   ReactDOM.render(
      //     React.createElement(
      //       'h1',
      //       { style: { color: 'red' } },
      //       `type 이 "태그 이름 문자열" 입니다.`,
      //     ),
      //     document.querySelector('#root'),
      //   );

      //   ReactDOM.render(
      //     <h1 style={{ color: 'red' }}>type 이 "태그 이름 문자열" 입니다.</h1>,
      //     document.querySelector('#root'),
      //   );

      // 7. 복잡한 컴포넌트
      //   ReactDOM.render(
      //     React.createElement(
      //       'div',
      //       { style: { backgroundColor: 'red', width: 100, height: 100 } },
      //       React.createElement(
      //         'div',
      //         { style: { backgroundColor: 'green', width: 50, height: 50 } },
      //         null,
      //       ),
      //       React.createElement(
      //         'div',
      //         { style: { backgroundColor: 'yellow', width: 50, height: 50 } },
      //         null,
      //       ),
      //     ),
      //     document.querySelector('#root'),
      //   );

      //   ReactDOM.render(
      //     <div style={{ backgroundColor: 'red', width: 100, height: 100 }}>
      //       <div style={{ backgroundColor: 'green', width: 50, height: 50 }} />
      //       <div style={{ backgroundColor: 'yellow', width: 50, height: 50 }} />
      //     </div>,
      //     document.querySelector('#root'),
      //   );
    </script>
  </body>
</html>
```

<br>

## 왜 JSX 를 쓰나요?

+ React.createElement VS JSX
  + 가독성 완승
+ babel 과 같은 컴파일 과정에서 문법적 오류를 인지하기 쉬움

<br>

## JSX 문법

+ 최상위 요소가 하나여야 합니다.
+ 최상위 요소를 리턴하는 경우, () 로 감싸야 합니다. 
+ 자식들을 바로 랜더링하고 싶으면, <>자식들</> 를 사용합니다. => Fragment
+ 자바스크립트 표현식을 사용하려면, {표현식} 를 이용합니다. 
+ if 문은 사용할 수 없습니다. 
  + 삼항 연산자 혹은 && 를 사용합니다. 
+ style 을 이용해 인라인 스타일링이 가능합니다. 
+ class 대신 className 을 사용해 class 를 적용할 수 있습니다. 
+ 자식 요소가 있으면, 꼭 닫아야 하고, 자식 요소가 없으면 열면서 닫아야 합니다.
  + `<p>어쩌구</p>`
  + `<br />`



