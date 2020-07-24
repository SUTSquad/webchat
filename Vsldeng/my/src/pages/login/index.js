import React, { Component } from "react";
import Login from "./login";
import "./login.less";

export default class LoginCom extends Component {
  render() {
    return (
      <div className="loginContainer">
        <Login history={this.props.history}></Login>
      </div>
    );
  }
}
