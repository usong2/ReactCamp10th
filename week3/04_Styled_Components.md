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

```jsx
/* src/StyledButton.jsx */

import React from 'react';
import styled from 'styled-components';

function MyButton({ className, children }) {
  return <button className={className}>MyButton {children}</button>;
}

const StyledButton = styled(MyButton)`
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

