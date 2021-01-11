import axios from "axios";

//const PORT = process.env.PORT || 8080;

export default axios.create({
  // XXX fix hardcoded port
  baseURL: `/api`,
  headers: {
    "Content-type": "application/json"
  }
});
