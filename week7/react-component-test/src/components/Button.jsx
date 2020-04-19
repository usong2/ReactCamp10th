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
