# Styled Components

```bash
npx create-react-app styled-components-example
cd styled-components-example
npm i styled-components
code .
npm start
```

<br>

## styled.&lt;태그&gt; **'**스타일**'**

### 버튼 생성

```jsx
/* src/StyledButton.jsx */

import styled from "styled-components";

const StyledButton = styled.button``;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StyledButton from "./StyledButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <StyledButton>버튼</StyledButton>
        </p>
      </header>
    </div>
  );
}

export default App;
```

<br>

### 버튼 스타일

```jsx
/* src/StyledButton.jsx */

import styled from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default StyledButton;
```

<br>

## ${props => css&#39;스타일&#39;}

```jsx
/* src/StyledButton.jsx */

import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

export default StyledButton;

```

```jsx
/* src/App.js */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StyledButton from "./StyledButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <StyledButton>버튼</StyledButton>
          <StyledButton primary>버튼</StyledButton>
        </p>
      </header>
    </div>
  );
}

export default App;
```

<br>

## :star:styled(StyledButton)

```jsx
/* src/StyledButton.jsx */

import styled, { css } from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const PrimaryStyledButton = styled(StyledButton)`
  background: palevioletred;
  color: white;
`;
export { PrimaryStyledButton };

export default StyledButton;
```

```jsx
/* src/App.js */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StyledButton, { PrimaryStyledButton } from "./StyledButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <StyledButton>버튼</StyledButton>
          <PrimaryStyledButton primary>버튼</PrimaryStyledButton>
        </p>
      </header>
    </div>
  );
}

export default App;
```

<br>

## as=&quot;태그&quot;

+ a 태그와 같이 동작

```jsx
/* src/App.js */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StyledButton, { PrimaryStyledButton } from "./StyledButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <StyledButton as="a" href="/">
            버튼
          </StyledButton>
          <PrimaryStyledButton primary>버튼</PrimaryStyledButton>
        </p>
      </header>
    </div>
  );
}

export default App;
```

<br>

## as={컴포넌트}

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
  display: inline-block;
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

const UppercaseButton = props => (
  <button {...props} children={props.children.toUpperCase()} />
);

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton as={UppercaseButton}>button</StyledButton>
        <StyledButton>button</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

<br>

## :star:styled(컴포넌트)

### 기본 버튼

```jsx
/* src/StyledButton.jsx */

import React from "react";
import styled, { css } from "styled-components";

// const MyButton = ({ className, children }) => (
//   <button className={className}>{children}</button>
// );
const MyButton = props => <button {...props} />;

const StyledButton = styled(MyButton)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>button</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

### primary 버튼

```jsx
/* src/StyledButton.jsx */

import React from "react";
import styled, { css } from "styled-components";

// const MyButton = ({ className, children }) => (
//   <button className={className}>{children}</button>
// );
const MyButton = props => <button {...props} />;

const StyledButton = styled(MyButton)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyButton from "./StyledButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <MyButton>버튼</MyButton>
        </p>
      </header>
    </div>
  );
}

export default App;
```

<br>

## styled('태그') = styled.태그

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled('button')`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>button</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

<br>

## ${props => props.color||"}

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.color || 'palevioletred'};
  color: ${props => props.color || 'palevioletred'};
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>button</StyledButton>
        <StyledButton color="red">red button</StyledButton>
        <StyledButton color="green">green button</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

<br>

## :hover {스타일}

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  :hover {
    border: 2px solid red;
  }
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

## ::before {스타일}

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ::before {
    content: '@';
  }
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

<br>

## &:hover {스타일}

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  &:hover {
    border: 2px solid red;
  }
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

+ 참고: [https://sass-lang.com/documentation/style-rules/parent-selector](https://sass-lang.com/documentation/style-rules/parent-selector)

<br>

## & ~ & {스타일}, & + & {스타일}

+ & ~ &: 형제 선택자
+ & + &: 인접 선택자 

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  & ~ & {
    border: 2px solid red;
  }

  & + & {
    border: 2px solid green;
  }
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>버튼</StyledButton>
        <StyledButton>버튼</StyledButton>
        <StyledButton>버튼</StyledButton>
        <button>버튼</button>
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

<br>

## &.클래스 {스타일}

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  &.orange {
    border: 2px solid orange;
  }
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton className="orange">버튼</StyledButton>
      </p>
      <p className="orange">
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

<br>

## .클래스 {스타일}

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  .orange {
    color: orange;
  }
`;

export default StyledButton;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>
          <a className="orange">버튼</a>
        </StyledButton>
      </p>
    </div>
  );
}

export default App;
```

<br>

## createGlobalStyle '스타일'

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid palevioletred;
`;

export default StyledButton;
```

### 일반 버튼을 글로벌

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  button {
    color: palevioletred;
  }
`;

function App() {
  return (
    <div className="App">
      <p>
        <GlobalStyle />
        <StyledButton>버튼</StyledButton>
        <button>버튼</button>
      </p>
    </div>
  );
}

export default App;
```

### styled 버튼을 글로벌

```jsx
/* src/App.js */

import React from 'react';
import StyledButton from './components/StyledButton';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  button${StyledButton} {
    color: palevioletred;
  }
`;

function App() {
  return (
    <div className="App">
      <p>
        <GlobalStyle />
        <StyledButton>버튼</StyledButton>
        <button>버튼</button>
      </p>
    </div>
  );
}

export default App;
```

<br>

## :star:styled.태그.attr(props => ({속성들}))

```jsx
/* src/StyledButton.jsx */

import styled from 'styled-components';

const StyledA = styled.a.attrs(props => ({
  href: props.href || 'https://github.com',
  color: props.color || 'palevioletred',
  target: '_BLANK',
}))`
  color: ${props => props.color};
`;

export default StyledA;
```

```jsx
/* src/App.js */

import React from 'react';
import StyledA from './components/StyledA';

function App() {
  return (
    <div className="App">
      <p>
        <StyledA>링크</StyledA>
        <StyledA color="red">링크</StyledA>
      </p>
    </div>
  );
}

export default App;
```

<br>