import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://192.168.1.7:80/api",
});

export default instance;
