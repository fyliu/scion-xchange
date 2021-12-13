import api from "./api";
import TokenService from "./token.service";

const API_URL = "/auth/";

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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
