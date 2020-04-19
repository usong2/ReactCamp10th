# React Testing

## JavaScript Unit Test

### Unit Test

+ 사람을 믿으시겠습니까? 테스트 코드를 믿으시겠습니까?
  + 실제로는 사람이 아니라, 사람의 감입니다.
  + 코드는 거짓말을 하지 않습니다.
+ 통합테스트에 비해 빠르고 쉽습니다.
+ 통합테스트를 진행하기 전에 문제를 찾아낼 수 있습니다.
  + 그렇다고, 통합테스트가 성공하리란 보장은 없습니다.
+ 테스트 코드가 살아있는(동작을 설명하는) 명세가 됩니다.
  + 테스트를 읽고 어떻게 동작하는지도 예측 가능합니다.
+ 소프트웨어 장인이 되려면 TDD 해야합니다.
  + 선 코딩 후, (몰아서) 단위테스트가 아니라

<br>

### facebook/jest

+ 리액트의 영향이 크겠지만 가장 핫한 테스트 도구
+ 👩🏻‍💻Easy Setup
+ 🏃🏽Instant Feedback
  + 고친 파일만 빠르게 테스트 다시 해주는 기능 등
+ 📸Snapshot Testing
  + 컴포넌트 테스트에 중요한 역할을 하는 스냅샷
+ 참고: [https://jestjs.io/](https://jestjs.io/)

<br>

#### 설치

```bash
$ mkdir jest-example
$ cd jest-example
$ npm init -y
$ npm i jest -D
```

#### package.json

```jsx
{
  "name": "jest-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^25.3.0"
  }
}
```

#### 실습

+ ./jest-example 안에 example.test.js 생성

  ```jsx
  test("1 더하기 2 는 3 이다.", () => {
    expect(1 + 2).toBe(3);
  });
  ```

+ command line 명령어 수행

  ```bash
  $ npm test
  ```

+ 아래와 같이 표현 가능

  ```jsx
  test("1 더하기 2 는 3 이다.", () => {
    const expected = 1 + 2;
    const received = 3;
    expect(expected).toBe(received);
  });
  ```

+ expect 문법 참고 : [https://jestjs.io/docs/en/expect](https://jestjs.io/docs/en/expect)

+ should, expect, assert 참고: [https://www.chaijs.com/](https://www.chaijs.com/)

#### it(=test), describe, expect

```jsx
describe('expect test', () => {
  it('37 to equal 37', () => {
    const received = 37;
    const expected = 37;
    expect(received).toBe(expected);
  });

  it('{age: 37} to equal {age: 37}', () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toBe(expected);
  });

  it('{age: 37} to equal {age: 37}', () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toEqual(expected);
  });
});
```

#### 실습

+ ./jest-example/example.test.js 수정

  ```jsx
  describe("산수", () => {
    it("1 더하기 2 는 3 이다.", () => {
      const expected = 1 + 2;
      const received = 3;
      expect(expected).toBe(received);
    });
  
    it("{age: 37} to equal {age: 37}  ", () => {
      expect({ age: 37 }).toEqual({ age: 37 });
    });
  });
  ```

#### .to~

```jsx
describe('.to~ test', () => {
  it('.toBe', () => {
    expect(37).toBe(37);
  });
  it('.toHaveLength', () => {
    expect('hello').toHaveLength(5);
  });
  it('.toHaveProperty', () => {
    expect({ name: 'Mark' }).toHaveProperty('name');
    expect({ name: 'Mark' }).toHaveProperty('name', 'Mark');
  });
  it('.toBeDefined', () => {
    expect({ name: 'Mark' }.name).toBeDefined();
  });
  it('.toBeFalsy', () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(NaN).toBeFalsy();
  });
  it('.toBeGreaterThan', () => {
    expect(10).toBeGreaterThan(9);
  });
});
```

```jsx
describe('.to~ test', () => {
  it('.toBeGreaterThanOrEqual', () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });
  it('.toBeInstanceOf', () => {
    class Foo {}
    expect(new Foo()).toBeInstanceOf(Foo);
  });
  it('.toBeNull', () => {
    expect(null).toBeNull();
  });
  it('.toBeTruthy', () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect('hello').toBeTruthy();
    expect({}).toBeTruthy();
  });
  it('.toBeUndefined', () => {
    expect({ name: 'Mark' }.age).toBeUndefined();
  });
  it('.toBeNaN', () => {
    expect(NaN).toBeNaN();
  });
});
```

#### .not.to~

```jsx
describe('.to~ test', () => {
  it('.toBeGreaterThanOrEqual', () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });
  it('.toBeInstanceOf', () => {
    class Foo {}
    expect(new Foo()).toBeInstanceOf(Foo);
  });
  it('.toBeNull', () => {
    expect(null).toBeNull();
  });
  it('.toBeTruthy', () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect('hello').toBeTruthy();
    expect({}).toBeTruthy();
  });
  it('.toBeUndefined', () => {
    expect({ name: 'Mark' }.age).toBeUndefined();
  });
  it('.toBeNaN', () => {
    expect(NaN).toBeNaN();
  });
});
```

#### async test with done callback

```jsx
describe('use async test', () => {
  it('setTimeout without done', () => {
    setTimeout(() => {
      expect(37).toBe(36);
    }, 1000);
  });

  it('setTimeout with done', done => {
    setTimeout(() => {
      expect(37).toBe(36);
      done();
    }, 1000);
  });
});
```

#### 실습

+ ./jest-example/example.test.js 수정

  ```jsx
  describe("산수", () => {
    it("1 더하기 2 는 3 이다.", () => {
    const expected = 1 + 2;
      const received = 3;
      expect(expected).toBe(received);
    });
  
    it("{age: 37} to equal {age: 37}  ", () => {
      expect({ age: 37 }).toEqual({ age: 37 });
    });
  
    it("setTimeout without done", () => {
      setTimeout(() => {
        expect(37).toBe(36);
      }, 1000);
    });
  
    it("setTimeout with done", (done) => {
      setTimeout(() => {
        expect(37).toBe(36);
        done();
      }, 1000);
    });
  });
  ```
  

#### async test with Promise

```jsx
describe('use async test', () => {
  it('promise then', () => {
    function p() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return p().then(data => expect(data).toBe(37));
  });

  it('promise catch', () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('error'));
        }, 1000);
      });
    }
    return p().catch(e => expect(e).toBeInstanceOf(Error));
  });
});
```

```jsx
describe('use async test', () => {
  it('promise .resolves', () => {
    function p() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return expect(p()).resolves.toBe(37);
  });

  it('promise .rejects', () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('error'));
        }, 1000);
      });
    }
    return expect(p()).rejects.toBeInstanceOf(Error);
  });
});
```

#### async test with async-await

```jsx
describe('use async test', () => {
  it('async-await', async () => {
    function p() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }

    const data = await p();
    return expect(data).toBe(37);
  });
});
```

```jsx
describe('use async test', () => {
  it('async-await, catch', async () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('error'));
        }, 1000);
      });
    }

    try {
      await p();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
```

### 실습 정리

```jsx
// ./jest-example/example.test.js 

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

describe('expect test', () => {
  it('37 to equal 37', () => {
    const received = 37;
    const expected = 37;
    expect(received).toBe(expected);
  });

  it.skip('{age: 37} to equal {age: 37}', () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toBe(expected);
  });

  it('{age: 37} to equal {age: 37}', () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toEqual(expected);
  });
});

describe('.to~ test', () => {
  it('.toBe', () => {
    expect(37).toBe(37);
  });

  it('.toHaveLength', () => {
    expect('hello').toHaveLength(5);
  });

  it('.toHaveProperty', () => {
    expect({ name: 'Mark' }).toHaveProperty('name');
    expect({ name: 'Mark' }).toHaveProperty('name', 'Mark');
  });

  it('.toBeDefined', () => {
    expect({ name: 'Mark' }.name).toBeDefined();
  });

  it('.toBeFalsy', () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(NaN).toBeFalsy();
  });

  it('.toBeGreaterThan', () => {
    expect(10).toBeGreaterThan(9);
  });

  it('.toBeGreaterThanOrEqual', () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });

  it('.toBeInstanceOf', () => {
    class Foo {}
    expect(new Foo()).toBeInstanceOf(Foo);
  });

  it('.toBeNull', () => {
    expect(null).toBeNull();
  });

  it('.toBeTruthy', () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect('hello').toBeTruthy();
    expect({}).toBeTruthy();
  });

  it('.toBeUndefined', () => {
    expect({ name: 'Mark' }.age).toBeUndefined();
  });

  it('.toBeNaN', () => {
    expect(NaN).toBeNaN();
  });
});

describe('.not.to~ test', () => {
  it('.not.toBe', () => {
    expect(37).not.toBe(36);
  });

  it('.not.toBeFalsy', () => {
    expect(true).not.toBeFalsy();
    expect(1).not.toBeFalsy();
    expect('hello').not.toBeFalsy();
    expect({}).not.toBeFalsy();
  });

  it('.not.toBeGreaterThan', () => {
    expect(10).not.toBeGreaterThan(10);
  });
});

describe('use async test', () => {
  // Do not use like this
  it.skip('setTimeout without done', () => {
    setTimeout(() => {
      expect(37).toBe(36);
    }, 1000);
  });

  it('setTimeout with done', done => {
    setTimeout(() => {
      expect(37).toBe(37);
      done();
    }, 1000);
  });

  it('promise then', () => {
    function p() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return p().then(data => expect(data).toBe(37));
  });

  it('promise catch', () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('error'));
        }, 1000);
      });
    }
    return p().catch(e => expect(e).toBeInstanceOf(Error));
  });

  it('promise .resolves', () => {
    function p() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return expect(p()).resolves.toBe(37);
  });

  it('promise .rejects', () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('error'));
        }, 1000);
      });
    }
    return expect(p()).rejects.toBeInstanceOf(Error);
  });

  it('async-await', async () => {
    function p() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }

    const data = await p();
    return expect(data).toBe(37);
  });

  it('async-await, catch', async () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('error'));
        }, 1000);
      });
    }

    try {
      await p();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
```

<br>

## React Component Test

```bash
$ npx create-react-app react-component-test
$ cd react-component-test
$ npm test
```

+ ./src/App.test.js 파일 확인

  ```jsx
  import React from 'react';
  import { render } from '@testing-library/react';
  import App from './App';
  
  test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  ```

+ 참고: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

<br>

### 어떤 파일을 테스트 해주나요?

+ `__tests__ `폴더 안의 .js 파일
+ `.test.js`로 끝나는 파일
+ `.spec.js`로 끝나는 파일

<br>

### Button 컴포넌트

+ 컴포넌트가 정상적으로 생성
+ "button"이라고 쓰여있는 엘리먼트는 HTMLButtonElement
+ 버튼을 클릭하면, p 태그 안에  "버튼이 방금 눌렸다"라고 쓰여짐
+ 버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다"라고 쓰여짐
+ 버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다"라고 쓰여짐
+ 버튼을 클릭하면, 5초 동안 버튼이 비활성화

<br>

#### 컴포넌트가 정상적으로 생성

+ ./src/components에 Button.test.js 생성

  ```jsx
  // ./src/components/Button.test.js
  
  import React from "react";
  import Button from "./Button";
  import { render } from "@testing-library/react";
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  });
  ```

+ ./src/components에 Button.jsx 생성

  ```jsx
  // ./src/components/Button.jsx
  
  import React from "react";
  
  const Button = () => <></>;
  
  export default Button;
  ```

#### "button"이라고 쓰여 있는 엘리먼트는 HTMLButtonElement

+ ./src/components/Button.test.js 수정

  ```jsx
  // ./src/components/Button.test.js 
  
  import React from "react";
  import Button from "./Button";
  import { render } from "@testing-library/react";
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const { getByText } = render(<Button />);
  
      const buttonElement = getByText("button");
  
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });
  });
  ```

+ ./src/components/Button.jsx 수정

  ```jsx
  // ./src/components/Button.jsx
  
  import React from "react";
  
  const Button = () => <button>button</button>;
  
  export default Button;
  ```

#### 버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다" 라고 쓰여짐

+ ./src/components/Button.test.js 수정

  ```jsx
  // ./src/components/Button.test.js
  
  import React from "react";
  import Button from "./Button";
  import { render, fireEvent } from "@testing-library/react";
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const { getByText } = render(<Button />);
  
      const buttonElement = getByText("button");
  
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });
  
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // When
      const button = getByText("button");
      fireEvent.click(button);
  
      // Then
      const p = getByText("버튼이 방금 눌렸다.");
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  });
  ```

+ ./src/components/Button.jsx 수정

  ```jsx
  // ./src/components/Button.jsx
  
  import React from "react";
  
  const Button = () => (
    <>
      <button>button</button>
      <p>버튼이 방금 눌렸다.</p>
    </>
  );
  
  export default Button;
  ```

#### 버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다"라고 쓰여짐

+ ./src/components/Button.test.js 수정

  ```jsx
  // ./src/components/Button.test.js
  
  import React from "react";
  import Button from "./Button";
  import { render, fireEvent } from "@testing-library/react";
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const { getByText } = render(<Button />);
  
      const buttonElement = getByText("button");
  
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });
  
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // When
      const button = getByText("button");
      fireEvent.click(button);
  
      // Then
      const p = getByText("버튼이 방금 눌렸다.");
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  });
  ```

+ ./src/components/Button.jsx 수정

  ```jsx
  // ./src/components/Button.jsx
  
  import React, { useState } from "react";
  
  const Button = () => {
    const [message, setMessage] = useState("버튼이 눌리지 않았다.");
  
    function click() {
      setMessage("버튼이 방금 눌렸다.");
    }
  
    return (
      <>
        <button onClick={click}>button</button>
        <p>{message}</p>
      </>
    );
  };
  
  export default Button;
  ```

#### 버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여짐

+ ./src/components/Button.test.js 수정

  ```jsx
  // ./src/components/Button.test.js
  
import React from "react";
  import Button from "./Button";
  import { render, fireEvent } from "@testing-library/react";
  jest.useFakeTimers();
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const { getByText } = render(<Button />);
  
      const buttonElement = getByText("button");
  
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });
  
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // When
      const button = getByText("button");
      fireEvent.click(button);
  
      // Then
      const p = getByText("버튼이 방금 눌렸다.");
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
      const button = getByText("button");
      fireEvent.click(button);
  
      // When
      jest.advanceTimersByTime(5000);
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  });
  ```
  
+ ./src/Button.jsx 수정

  ```jsx
  // ./src/Button.jsx
  
  import React, { useState } from "react";
  
  const Button = () => {
    const [message, setMessage] = useState("버튼이 눌리지 않았다.");
  
    function click() {
      setMessage("버튼이 방금 눌렸다.");
      setTimeout(() => {
        setMessage("버튼이 눌리지 않았다.");
      });
    }
  
    return (
      <>
        <button onClick={click}>button</button>
        <p>{message}</p>
      </>
    );
  };
  
  export default Button;
  ```

이렇게 테스트를 실행하면 오류가 발생

```bash
Warning: An update to Button inside a test was not wrapped in act( ... ):
```

+ ./src/components/Button.test.js 수정

  ```jsx
  // ./src/components/Button.test.js
  
  ...
  
    it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
      const button = getByText("button");
      act(() => {
        fireEvent.click(button);
      });
  
      // When
      act(() => {
        jest.advanceTimersByTime(5000);
      });
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
  ...
  ```

수정 후 테스트를 진행하면 또 에러가 발생

```bash
Warning: Cannot perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

+ ./src/components/Button.jsx 수정

  ```jsx
  // ./src/components/Button.jsx
  
  import React, { useState, useEffect, useRef } from "react";
  
  const Button = () => {
    const [message, setMessage] = useState("버튼이 눌리지 않았다.");
    let timer = useRef(null);
    function click() {
      if (timer.current !== null) clearTimeout(timer.current);
      setMessage("버튼이 방금 눌렸다.");
      timer.current = setTimeout(() => {
        setMessage("버튼이 눌리지 않았다.");
      });
    }
  
    useEffect(() => {
      return () => {
        if (timer.current !== null) clearTimeout(timer.current);
      };
    }, []);
  
    return (
      <>
        <button onClick={click}>button</button>
        <p>{message}</p>
      </>
    );
  };
  
  export default Button;
  ```

#### 버튼을 클릭하면, 5초 동안 버튼이 비활성화 됨

+ ./src/components/Button.test.js 수정

  ```jsx
  // ./src/components/Button.test.js
  
  import React from "react";
  import Button from "./Button";
  import { render, fireEvent } from "@testing-library/react";
  import { act } from "react-dom/test-utils";
  jest.useFakeTimers();
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const { getByText } = render(<Button />);
  
      const buttonElement = getByText("button");
  
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });
  
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // When
      const button = getByText("button");
      fireEvent.click(button);
  
      // Then
      const p = getByText("버튼이 방금 눌렸다.");
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
      const button = getByText("button");
      act(() => {
        fireEvent.click(button);
      });
  
      // When
      act(() => {
        jest.advanceTimersByTime(5000);
      });
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it("버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.", () => {
      // Given
      const { getByText } = render(<Button />);
      const button = getByText("button");
      act(() => {
        fireEvent.click(button);
      });
  
      // Then
      expect(button.disabled).toBe(true);
  
      // When
      act(() => {
        jest.advanceTimersByTime(5000);
      });
  
      // Then
      expect(button.disabled).toBe(false);
    });
  });
  ```

+ ./src/components/Button.jsx 수정

  ```jsx
  // ./src/components/Button.jsx
  
  import React, { useState, useEffect, useRef } from "react";
  
  const INITIAL_MESSAGE = "버튼이 눌리지 않았다.";
  
  const Button = () => {
    const [message, setMessage] = useState(INITIAL_MESSAGE);
    const timer = useRef(null);
    function click() {
      if (timer.current !== null) clearTimeout(timer.current);
      setMessage("버튼이 방금 눌렸다.");
      timer.current = setTimeout(() => {
        setMessage(INITIAL_MESSAGE);
      }, 5000);
    }
  
    useEffect(() => {
      return () => {
        if (timer.current !== null) clearTimeout(timer.current);
      };
    }, []);
  
    return (
      <>
        <button onClick={click} disabled={message === "버튼이 방금 눌렸다."}>
          button
        </button>
        <p>{message}</p>
      </>
    );
  };
  
  export default Button;
  ```

<br>

#### 최종 테스트

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import logo from "./logo.svg";
  import "./App.css";
  import Button from "./components/Button";
  
  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button />
        </header>
      </div>
    );
  }
  
  export default App;
  ```

+ ./src/App.test.js 수정

  ```jsx
  // ./src/App.test.js
  
  import React from "react";
  import { render } from "@testing-library/react";
  import App from "./App";
  
  test("renders learn react link", () => {
    const { getByText } = render(<App />);
    // const linkElement = getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });
  ```

+ ```bash
  $ npm start
  ```

#### 참고

+ DOM과 관련된 여러 함수들: [https://github.com/testing-library/jest-dom#table-of-contents](https://github.com/testing-library/jest-dom#table-of-contents)

+ ./src/components/Button.test.js 수정 시에도 동일하게 동작

  ```jsx
  // ./src/components/Button.test.js
  
  import React from "react";
  import Button from "./Button";
  import { render, fireEvent } from "@testing-library/react";
  import { act } from "react-dom/test-utils";
  jest.useFakeTimers();
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const { getByText } = render(<Button />);
  
      const buttonElement = getByText("button");
  
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });
  
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // When
      const button = getByText("button");
      fireEvent.click(button);
  
      // Then
      const p = getByText("버튼이 방금 눌렸다.");
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
      const button = getByText("button");
      act(() => {
        fireEvent.click(button);
      });
  
      // When
      act(() => {
        jest.advanceTimersByTime(5000);
      });
  
      // Then
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  
    it("버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.", () => {
      // Given
      const { getByText } = render(<Button />);
      const button = getByText("button");
      act(() => {
        fireEvent.click(button);
      });
  
      // Then
      expect(button).toBeDisabled();
  
      // When
      act(() => {
        jest.advanceTimersByTime(5000);
      });
  
      // Then
      expect(button).not.toBeDisableds();
    });
  });
  ```

#### user-event

+ [https://testing-library.com/docs/ecosystem-user-event](https://testing-library.com/docs/ecosystem-user-event)

<br>

## enzyme 활용하기

+ enzyme: [https://airbnb.io/enzyme/](https://airbnb.io/enzyme/)

```bash
$ npm i enzyme enzyme-adapter-react-16 -D
```

### Button 컴포넌트

#### 컴포넌트가 정상적으로 생성

```jsx
// src/components/Button.enzyme.test.js

import React from "react";
import Enzyme, { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import Button from "./Button";

Enzyme.configure({ adapter: new Adapter() });

describe("Button 컴포넌트 (enzyme)", () => {
  it("컴포넌트가 정상적으로 생성된다.", () => {
    shallow(<Button />);
  });
});
```

#### 버튼 엘리먼트에 써있는 텍스트는 "button" 임

```jsx
describe("Button 컴포넌트 (enzyme)", () => {
  // ...
  
  it(`버튼 엘리먼트에 써있는 텍스트는 "button" 이다.`, () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    expect(button.text()).toBe("button");
  });
});
```

#### 버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다"라고 쓰여짐

```jsx
describe("Button 컴포넌트 (enzyme)", () => {
  // ...
  
  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    button.simulate("click");

    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 방금 눌렸다.");
  });
});
```

#### 버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다."라고 쓰여짐

```jsx
describe("Button 컴포넌트 (enzyme)", () => {
  // ...
  
  it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    const wrapper = shallow(<Button />);

    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 눌리지 않았다.");
  });
});
```

#### 버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여짐

```jsx
jest.useFakeTimers();

describe("Button 컴포넌트 (enzyme)", () => {
  // ...
  
  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, async () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    button.simulate("click");

    jest.advanceTimersByTime(5000);

    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 눌리지 않았다.");
  });
});
```

#### 버튼을 클릭하면, 5초 동안 버튼이 비활성화됨

```jsx
jest.useFakeTimers();

describe("Button 컴포넌트 (enzyme)", () => {
  // ...
  
  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    button.simulate("click");

    expect(wrapper.find("button").prop("disabled")).toBeTruthy();

    jest.advanceTimersByTime(5000);

    expect(wrapper.find("button").prop("disabled")).toBeFalsy();
  });
});
```

+ ./src/components/Button.enzyme.test.js 

  ```jsx
  // ./src/components/Button.enzyme.test.js
  
  import React from "react";
  import Button from "./Button";
  import { act } from "react-dom/test-utils";
  import Enzyme, { shallow } from "enzyme";
  import Adapter from "enzyme-adapter-react-16";
  
  Enzyme.configure({ adapter: new Adapter() });
  
  jest.useFakeTimers();
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      shallow(<Button />);
    });
  
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const wrapper = shallow(<Button />);
      const button = wrapper.find("button");
      expect(button.text()).toBe("button");
    });
  
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다`, () => {
      // Given
      const wrapper = shallow(<Button />);
  
      // When
      const button = wrapper.find("button");
      button.simulate("click");
  
      // Then
      const p = wrapper.find("p");
      expect(p.text()).toBe("버튼이 방금 눌렸다.");
    });
  
    it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const wrapper = shallow(<Button />);
  
      // Then
      const p = wrapper.find("p");
      expect(p.text()).toBe("버튼이 눌리지 않았다.");
    });
  
    it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      // Given
      const wrapper = shallow(<Button />);
      const button = wrapper.find("button");
      act(() => {
        button.simulate("click");
      });
  
      // When
      act(() => {
        jest.advanceTimersByTime(5000);
      });
  
      // Then
      const p = wrapper.find("p");
      expect(p.text()).toBe("버튼이 눌리지 않았다.");
    });
  
    it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
      const wrapper = shallow(<Button />);
  
      act(() => {
        const button = wrapper.find("button");
        button.simulate("click");
      });
  
      expect(wrapper.find("button").prop("disabled")).toBeTruthy();
  
      act(() => {
        jest.advanceTimersByTime(5000);
      });
  
      expect(wrapper.find("button").prop("disabled")).toBeFalsy();
    });
  });
  ```

  