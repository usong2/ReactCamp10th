import React, { useState, useEffect } from "react";

export default function Example5() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("a", count); // 새로운 값
    return () => {
      // cleanup
      console.log("b", count); // 예전 값
    };
  }, [count]);

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
