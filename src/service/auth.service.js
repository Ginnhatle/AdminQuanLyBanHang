import api from "./api";
import TokenService from "./token.service";

// import axios from "axios";

// const API_URL = "/auth";

const signup = (name, password) => {
  return api
    .post("/auth/signup", {
      name,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const login = (name, password) => {
  return api
    .post("/auth/login", {
      name,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data.data.token);
      }

      return response.data.data.token;
    });
};

const logout = () => {
  // localStorage.removeItem("user");
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
