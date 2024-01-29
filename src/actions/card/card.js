import * as api from "../../api";
import {
CREATE_CARD,
GET_CARD,
DELETE_CARD,
UPDATE_CARD,
GET_CARD_BY_ID
} from "../../constants/actionTypes";

export const createCard = (formData) => async (dispatch) => {
  try {
    const response = await api.createCard(formData);
    dispatch({ type: CREATE_CARD, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCard = () => async (dispatch) => {
    try {
      const { data } = await api.getCard();
      dispatch({ type: GET_CARD, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteCard = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCard(id);
      dispatch({ type: DELETE_CARD, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getCardById = (id) => async (dispatch) => {
    try {
      const { data } = await api.getCardById(id);
      dispatch({ type: GET_CARD_BY_ID, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const updateCard = (formData) => async (dispatch) => {
    try {
      const response = await api.updateCard(formData);
      dispatch({ type: UPDATE_CARD, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  







