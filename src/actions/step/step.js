import * as api from "../../api";
import {
ADD_STEPS,
GET_STEPS,
DELETE_STEPS,
UPDATE_STEPS
} from "../../constants/actionTypes";

export const addSteps= (stepsInfo) => async (dispatch) => {
  try {
    const response = await api.addSteps(stepsInfo);
    dispatch({ type: ADD_STEPS, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSteps = (cardId) => async (dispatch) => {
    try {
      const { data } = await api.getSteps(cardId);
      dispatch({ type: GET_STEPS, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteSteps = (id) => async (dispatch) => {
    try {
      const response = await api.deleteSteps(id);
      dispatch({ type: DELETE_STEPS, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  export const updateSteps = (stepsInfo) => async (dispatch) => {
    try {
      const response = await api.updateSteps(stepsInfo);
      dispatch({ type: UPDATE_STEPS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  







