import React, { useState, useEffect } from "react";

export default function Example6() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{time.toISOString()}</div>;
}
