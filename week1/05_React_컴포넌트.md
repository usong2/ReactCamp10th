# React Component 만드는 법

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

