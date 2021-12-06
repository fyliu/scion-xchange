import api from "./api";
import TokenService from "./token.service";

//const PORT = process.env.PORT || 8080;
//const API_URL = "http://localhost:" + PORT + "/api/auth/";
const API_URL = "/auth/";
//const API_URL = 'https://scion-x-change.herokuapp.com/api/auth/';

const register = (username, email, password) => {
  return api.post(API_URL + "signup", {
    username,
    email,
    password
  });
};

const login = (username, password) => {
  return api
    .post(API_URL + "signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return TokenService.getUser();
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
