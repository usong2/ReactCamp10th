# Optimizing Performance

필요할 때만 렌더한다.

## Reconciliation

+ 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
+ 개발자가 key prop을 통해, 
  여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

### 엘리먼트의 타입이 다른 경우

```jsx
class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return (
        <div>
          <Foo />
        </div>
      );
    }
    return (
      <span>
        <Foo />
      </span>
    );
  }
}
```

```jsx
class Foo extends React.Component {
  componentDidMount() {
    console.log("Foo componentDidMount");
  }

  componentWillUnmount() {
    console.log("Foo componentWillUnmount");
  }

  render() {
    return <p>Foo</p>;
  }
}
```

### DOM 엘리먼트의 타입이 같은 경우(1)

```jsx
class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return <div className="before" title="stuff" />;
    }
    return <div className="after" title="stuff" />;
  }
}
```

### DOM 엘리먼트의 타입이 같은 경우(2)

```jsx
class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return <div style={{ color: "red", fontWeight: "bold" }} />;
    }
    return <div style={{ color: "green", fontWeight: "bold" }} />;
  }
}
```

### 같은 타입의 컴포넌트 엘리먼트

```jsx
class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return <Foo name="Mark" />;
    }
    return <Foo name="Anna" />;
  }
}
```

```jsx
class Foo extends React.Component {
  state = {};

  componentDidMount() {
    console.log("Foo componentDidMount");
  }

  componentWillUnmount() {
    console.log("Foo componentWillUnmount");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Foo getDerivedStateFromProps", nextProps, prevState);
    return {};
  }

  render() {
    console.log("Foo render");
    return <p>Foo</p>;
  }
}
```

### 자식에 대한 재귀적 처리(1)

```jsx
class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 3000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return (
        <ul>
          <Foo>first</Foo>
          <Foo>second</Foo>
        </ul>
      );
    }
    return (
      <ul>
        <Foo>first</Foo>
        <Foo>second</Foo>
        <Foo>third</Foo>
      </ul>
    );
  }
}
```

```jsx
class Foo extends React.Component {
  state = {};

  componentDidMount() {
    console.log("Foo componentDidMount", this.props.children);
  }

  componentWillUnmount() {
    console.log("Foo componentWillUnmount");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Foo getDerivedStateFromProps", nextProps, prevState);
    return {};
  }

  render() {
    console.log("Foo render", this.props.children);
    return <p>{this.props.children}</p>;
  }
}
```

### 자식에 대한 재귀적 처리(2)

```jsx
class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 3000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return (
        <ul>
          <Foo>second</Foo>
          <Foo>third</Foo>
        </ul>
      );
    }
    return (
      <ul>
        <Foo>first</Foo>
        <Foo>second</Foo>
        <Foo>third</Foo>
      </ul>
    );
  }
}
```

```jsx
class Foo extends React.Component {
  state = {};

  componentDidMount() {
    console.log("Foo componentDidMount", this.props.children);
  }

  componentWillUnmount() {
    console.log("Foo componentWillUnmount");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Foo getDerivedStateFromProps", nextProps, prevState);
    return {};
  }

  render() {
    console.log("Foo render", this.props.children);
    return <p>{this.props.children}</p>;
  }
}
```

### :star:자식에 대한 재귀적 처리(3)

```jsx
class App extends React.Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 3000);
  }
  render() {
    if (this.state.count % 2 === 0) {
      return (
        <ul>
          <Foo key="2">second</Foo>
          <Foo key="3">third</Foo>
        </ul>
      );
    }
    return (
      <ul>
        <Foo key="1">first</Foo>
        <Foo key="2">second</Foo>
        <Foo key="3">third</Foo>
      </ul>
    );
  }
}
```

```jsx
class Foo extends React.Component {
  state = {};

  componentDidMount() {
    console.log("Foo componentDidMount", this.props.children);
  }

  componentWillUnmount() {
    console.log("Foo componentWillUnmount");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Foo getDerivedStateFromProps", nextProps, prevState);
    return {};
  }

  render() {
    console.log("Foo render", this.props.children);
    return <p>{this.props.children}</p>;
  }
}
```

<br>

![https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6618737/스크린샷_2019-10-05_오전_11.43.29.png](https://s3.amazonaws.com/media-p.slid.es/uploads/640576/images/6618737/스크린샷_2019-10-05_오전_11.43.29.png)

### setState와 함께 일어나는 일

```jsx
class App extends React.Component {
  state = {
    text: "",
    persons: [
      {
        id: 1,
        name: "Mark",
        age: 37
      },
      {
        id: 2,
        name: "Anna",
        age: 26
      }
    ]
  };
  render() {
    console.log("App render");
    const { text, persons } = this.state;
    return (
      <div>
        <input type="text" value={text} onChange={this._change} />
        <button onClick={this._click}>click</button>
        <ul>
          {persons.map(p => (
            <Person {...p} key={p.id} />
          ))}
        </ul>
      </div>
    );
  }

  _change = e => {
    this.setState({
      ...this.state,
      text: e.target.value
    });
  };

  _click = () => {
    console.log(this.state.text);
  };
}
```

```jsx
class Person extends React.Component {
  render() {
    console.log("Person render");

    const { name, age } = this.props;
    return (
      <ul>
        {name} / {age}
      </ul>
    );
  }
}
```

### shouldComponentUpdate

```jsx
class App extends React.Component {
  state = {
    text: "",
    persons: [
      {
        id: 1,
        name: "Mark",
        age: 37
      },
      {
        id: 2,
        name: "Anna",
        age: 26
      }
    ]
  };
  render() {
    console.log("App render");
    const { text, persons } = this.state;
    return (
      <div>
        <input type="text" value={text} onChange={this._change} />
        <button onClick={this._click}>click</button>
        <ul>
          {persons.map(p => (
            <Person {...p} key={p.id} />
          ))}
        </ul>
      </div>
    );
  }

  _change = e => {
    this.setState({
      ...this.state,
      text: e.target.value
    });
  };

  _click = () => {
    console.log(this.state.text);
  };
}
```

```jsx
class Person extends React.Component {
  shouldComponentUpdate(previousProps) {
    for (const key in this.props) {
      if (previousProps[key] !== this.props[key]) {
        return true;
      }
    }
    return false;
  }
  render() {
    console.log("Person render");

    const { name, age } = this.props;
    return (
      <ul>
        {name} / {age}
      </ul>
    );
  }
}
```

### PureComponent

```jsx
class App extends React.Component {
  state = {
    text: "",
    persons: [
      {
        id: 1,
        name: "Mark",
        age: 37
      },
      {
        id: 2,
        name: "Anna",
        age: 26
      }
    ]
  };
  render() {
    console.log("App render");
    const { text, persons } = this.state;
    return (
      <div>
        <input type="text" value={text} onChange={this._change} />
        <button onClick={this._click}>click</button>
        <ul>
          {persons.map(p => (
            <Person {...p} key={p.id} />
          ))}
        </ul>
      </div>
    );
  }

  _change = e => {
    this.setState({
      ...this.state,
      text: e.target.value
    });
  };

  _click = () => {
    console.log(this.state.text);
  };
}
```

```jsx
class Person extends React.PureComponent {
  render() {
    console.log("Person render");

    const { name, age } = this.props;
    return (
      <ul>
        {name} / {age}
      </ul>
    );
  }
}
```

### onClick={() => {}}

```jsx
class App extends React.Component {
  state = {
    text: "",
    persons: [
      {
        id: 1,
        name: "Mark",
        age: 37
      },
      {
        id: 2,
        name: "Anna",
        age: 26
      }
    ]
  };
  render() {
    console.log("App render");
    const { text, persons } = this.state;
    return (
      <div>
        <input type="text" value={text} onChange={this._change} />
        <button onClick={this._click}>click</button>
        <ul>
          {persons.map(p => (
            <Person {...p} key={p.id} onClick={() => {}} />
          ))}
        </ul>
      </div>
    );
  }

  _change = e => {
    this.setState({
      ...this.state,
      text: e.target.value
    });
  };

  _click = () => {
    console.log(this.state.text);
  };
}
```

```jsx
class Person extends React.PureComponent {
  render() {
    console.log("Person render");

    const { name, age } = this.props;
    return (
      <ul>
        {name} / {age}
      </ul>
    );
  }
}
```

### :star:React.memo

```jsx
class App extends React.Component {
  state = {
    text: "",
    persons: [
      {
        id: 1,
        name: "Mark",
        age: 37
      },
      {
        id: 2,
        name: "Anna",
        age: 26
      }
    ]
  };
  render() {
    console.log("App render");
    const { text, persons } = this.state;
    return (
      <div>
        <input type="text" value={text} onChange={this._change} />
        <button onClick={this._click}>click</button>
        <ul>
          {persons.map(p => (
            <Person {...p} key={p.id} onClick={() => {}} />
          ))}
        </ul>
      </div>
    );
  }

  _change = e => {
    this.setState({
      ...this.state,
      text: e.target.value
    });
  };

  _click = () => {
    console.log(this.state.text);
  };
}
```

```jsx
const Person = React.memo(props => {
  console.log("Person render");

  const { name, age } = props;
  return (
    <ul>
      {name} / {age}
    </ul>
  );
});
```

