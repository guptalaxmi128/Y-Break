import * as api from "../../api";
import {
GET_USERS
} from "../../constants/actionTypes";



export const getUsers = () => async (dispatch) => {
    try {
      const { data } = await api.getUsers();
      dispatch({ type: GET_USERS, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };