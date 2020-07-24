import React from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Login} />
          <Redirect to={"/home"} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
