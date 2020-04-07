import React, { useState, useEffect } from "react";
import "./App.css";
import Example1 from "./components/Example1";
import Example2 from "./components/Example2";
import Example5 from "./components/Example5";
import useWindowWidth from "./hooks/useWindowWidth";
import withHasMounted from "./hocs/withHasMounted";
import useHasMounted from "./hooks/useHasMounted";

function App() {
  const hasMounted = useHasMounted();
  console.log(hasMounted);
  const width = useWindowWidth();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);
  return (
    <div className="App">
      <h1>{width}</h1>
      <Example1 />
      <Example2 />
      {visible && <Example5 />}
    </div>
  );
}

export default App;
