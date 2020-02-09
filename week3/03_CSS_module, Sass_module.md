# css module, sass module

## css module

```jsx
/* src/App.js */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./Button";

function App() {
    return (
    	<div className="App">
          <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Button />
          </header>
        </div>
    );
}

export default App;
```

```jsx
/* src/Button.jsx */

import React from "react";
import { test } from "./Button.module.css";

export default function Button() {
    return <button className={test}>버튼</button>;
}
```

```css
/* src/Button.module.css */

.text {
    color: green
}
```

<br>

## scss module

```jsx
/* src/Button.jsx */

import React from "react";
import { test } from "./Button.module.scss";

export default function Button() {
    return <button className={foo === "y" ? `${styles.test} ${styles.active}` : styles.test}>버튼</button>;
}
```

```scss
/* src/Button.module.scss */

.Button {
    .test {
        color: green;
    }
}

.active {
    color: yellow;
}
```

+ ClassNames : [https://github.com/JedWatson/classnames#readme](https://github.com/JedWatson/classnames#readme)

```bash
npm install classnames
npm start
```

<br>

### import classNames from 'classnames';

```jsx
import classNames from 'classnames';

console.log(classNames('foo', 'bar')); // "foo bar"
console.log(classNames('foo', 'bar', 'baz')); // "foo bar baz"

console.log(classNames({ foo: true }, { bar: true })); // "foo bar"
console.log(classNames({ foo: true }, { bar: false })); // "foo"
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // "bar 1"
console.log(classNames(styles.button, styles.loading)); // Button_button__2Ce79 Button_loading__XEngF
```

<br>

```jsx
/* src/Button.jsx */

import React from "react";
import { test } from "./Button.module.scss";
import classNames from 'classnames';

export default function Button() {
    // return <button className={foo === "y" ? `${styles.test} ${styles.active}` : styles.test}>버튼</button>;
    
    return <button className={cx("test", { active: foo === "y" })}>버튼</button>;
}
```

