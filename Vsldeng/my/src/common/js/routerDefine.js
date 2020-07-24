import React from "react";

export default function routerDefine(props) {
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) {
    props.history.push("/login");
  }
}
