import axios from "axios";

export default axios.create({
  baseURL: "http://182.61.133.4/",
  responseType: "json",
  timeout: 5000,
});
