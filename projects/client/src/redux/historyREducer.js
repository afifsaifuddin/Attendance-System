import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  history: [],
  role: [],
  work: {},
};

const HistoryReducer = createSlice({
  name: "HistoryReducer",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = [...action.payload];
    },
    setWork: (state, action) => {
      state.work = action.payload;
    },
  },
});

export const clockIn = (toast) => {
  return async (dispath) => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.post(
        `${URL_API}/attendence/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Clock in Success",
        description: "Happy Working",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Clockin Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const clockOut = (toast) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    console.log("logout");
    try {
      const respon = await axios.patch(
        `${URL_API}/attendence/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Clock Out Success",
        description: "Thankyou Brada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Clock out Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const fetchHistory = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    console.log("ini History");
    try {
      const respon = await axios.get(`${URL_API}/attendence/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setHistory(respon.data.history));
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setHistory } = HistoryReducer.actions;
export default HistoryReducer.reducer;
