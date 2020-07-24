import React, { Component } from "react";
import { Form, Input, Button, message, Card } from "antd";
import "./login.less";
import API from "../../services/http.base";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      title: "登录",
      newUserInfo: {
        phone: null,
        userName: null,
        password: null,
      },
    };
  }
  //处理用户注册电话
  handlePhoneChange = (e) => {
    this.setState({
      newUserInfo: {
        phone: e.target.value,
        userName: this.state.newUserInfo.userName,
        password: this.state.newUserInfo.password,
      },
    });
  };
  //处理用户名输入
  handleUserChange = (e) => {
    if (this.state.title === "登录") {
      this.setState({
        userName: e.target.value,
      });
    } else {
      this.setState({
        newUserInfo: {
          userName: e.target.value,
          password: this.state.newUserInfo.password,
          phone: this.state.newUserInfo.phone,
        },
      });
    }
  };
  //处理密码输入
  handlePassword = (e) => {
    if (this.state.title === "登录") {
      this.setState({
        password: e.target.value,
      });
    } else {
      this.setState({
        newUserInfo: {
          password: e.target.value,
          phone: this.state.newUserInfo.phone,
          userName: this.state.newUserInfo.userName,
        },
      });
    }
  };
  //处理登录调取后台接口校验用户名和密码
  handleLogin = async () => {
    if (this.state.title === "登录") {
      let data = await API.get("/user/login");
      console.log(data);
      if (data.status === 200) {
        message.success("登录成功");
        window.sessionStorage.setItem("token", data.data.token);
        this.props.history.push("/home");
      } else if (data.status === 1001) {
        message.error("用户名或密码错误");
        return;
      } else if (data.status === 1002) {
        message.error("用户不存在");
        return;
      }
    } else {
      let data = await API.get("mock.php");
      if (data) {
        message.success("注册成功");
      } else {
        message.success("注册失败");
      }
      this.handleRegister();
    }
  };
  //处理注册调取后台接口，传送新用户信息
  handleRegister = async () => {
    if (this.state.title === "登录") {
      this.setState({
        title: "新用户注册",
      });
    } else {
      this.setState({
        title: "登录",
        newUserInfo: {
          phone: null,
          userName: null,
          password: null,
        },
        userName: null,
        password: null,
      });
    }
    // if (data) {
    //   this.setState({
    //     title: "登录",
    //   });
    // }
  };
  render() {
    return (
      <Card title={this.state.title}>
        <Form {...layout}>
          <Form.Item
            label="电话"
            rules={[{ required: true, message: "请输入电话号码" }]}
            style={{ display: this.state.title === "登录" ? "none" : " " }}
          >
            <Input
              value={this.state.newUserInfo.phone}
              onChange={this.handlePhoneChange}
            />
          </Form.Item>

          <Form.Item
            label="用户名"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              value={
                this.state.title === "登录"
                  ? this.state.userName
                  : this.state.newUserInfo.userName
              }
              onChange={this.handleUserChange}
            />
          </Form.Item>

          <Form.Item
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              value={
                this.state.title === "登录"
                  ? this.state.password
                  : this.state.newUserInfo.password
              }
              onChange={this.handlePassword}
            />
          </Form.Item>

          <Form.Item {...tailLayout} className="buttons">
            <Button type="primary" onClick={this.handleLogin}>
              {this.state.title === "登录" ? "登录" : "提交"}
            </Button>
            <Button type="primary" onClick={this.handleRegister}>
              {this.state.title === "登录" ? "注册" : "取消"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
const layout = {
  labelCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
