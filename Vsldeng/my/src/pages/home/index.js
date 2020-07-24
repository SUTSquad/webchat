import React, { Component } from "react";
import "./home.less";
import Header from "../../components/header";
import routerDefine from "../../common/js/routerDefine";

export default class Home extends Component {
  componentDidMount() {
    routerDefine(this.props);
  }
  handleLogout = () => {
    window.sessionStorage.clear();
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="P-home">
        <Header></Header>
        <h1>Home page</h1>
        <button onClick={this.handleLogout}>退出</button>
      </div>
    );
  }
}
