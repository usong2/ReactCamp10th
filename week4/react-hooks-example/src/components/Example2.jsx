import React, { useState } from "react";

export default function Example2() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Usong");
  // state = {
  //   count: 0,
  // };
  // const { count } = this.state;

  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}
