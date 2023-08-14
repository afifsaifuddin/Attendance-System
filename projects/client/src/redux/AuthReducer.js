import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  user: {
    id: null,
    fullName: "",
    email: "",
    username: "",
    roleId: "",
    role: "",
  },
  login: false,
  role: [],
};

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action", action.payload);
      const { id, fullName, email, username, roleId, Role } = action.payload;
      state.user = { id, fullName, email, username, roleId, Role };
    },
    userLogin: (state, action) => {
      state.login = true;
    },
    userLogout: (state, action) => {
      state.login = false;
      localStorage.removeItem("token");
      setTimeout(() => {
        document.location.href = "/";
      }, 1000);
    },
    setRole: (state, action) => {
      state.role = [...action.payload];
      console.log("ROLE?", action.payload);
    },
  },
});

export const userKeepLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.get(
        `${URL_API}/auth-management/auth/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser(respon.data.findUser));
      dispatch(userLogin());
    } catch (error) {
      console.log(error);
    }
  };
};
export const loginAuth = (values, setLoading, toast, navigate) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const respon = await axios.post(`${URL_API}/auth-management/auth`, {
        email: values.email,
        password: values.password,
      });
      const token = respon.data.token;
      localStorage.setItem("token", token);
      dispatch(setUser(respon.data.Account));
      dispatch(userLogin());
      toast({
        title: "Success",
        description: "Login Success",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/home");
    } catch (error) {
      console.log("err reducer", error);
    } finally {
      setLoading(false);
    }
  };
};

export const getRole = () => {
  return async (dispatch) => {
    try {
      const respon = await axios.get(`${URL_API}/auth-management/auth/role`);
      dispatch(setRole(respon.data.account));
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const registEmployee = (values, setLoading, toast) => {
  console.log("masuk");
  return async (dispatch) => {
    console.log("regist", values);
    try {
      setLoading(true);
      const respon = await axios.post(
        `${URL_API}/auth-management/`,
        {
          email: values.email,
          roleId: values.roleId,
          baseSalary: values.baseSalary,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "Success",
        description: "Please check your email to continue",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/";
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
};

export const formEmployee = (values, setLoading, toast) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const url = window.location.href.split("/");
      const token = url.pop();
      console.log("url employe", url);
      console.log("token empo", token);
      const respon = await axios.patch(
        `${URL_API}/auth-management/`,
        {
          password: values.password,
          fullName: values.fullName,
          username: values.username,
          birthday: values.birthday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success",
        description: "Your data has been save",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/";
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
};

export const { userLogin, setUser, setRole, userLogout } = AuthReducer.actions;
export default AuthReducer.reducer;
