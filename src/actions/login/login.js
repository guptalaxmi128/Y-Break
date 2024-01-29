import * as api from "../../api";
import { LOGIN } from "../../constants/actionTypes";

export const login = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.login(userInfo);
    dispatch({ type: LOGIN, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
