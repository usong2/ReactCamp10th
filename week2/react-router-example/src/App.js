import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Links from "./components/Links";
import Login from "./pages/Login";

import withAuth from "./hocs/withAuth";

function App() {
  return (
    <BrowserRouter>
      <Links />
      <Switch>
        <Route path="/profile/:id" exact component={withAuth(Profile)} />
        <Route path="/profile" component={withAuth(Profile)} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
