import * as api from "../../api";
import {
ADD_CARD_DATA,
GET_CARD_DATA,
DELETE_CARD_DATA,
UPDATE_CARD_DATA
} from "../../constants/actionTypes";

export const addCardData = (cardInfo) => async (dispatch) => {
  try {
    const response = await api.addCardData(cardInfo);
    dispatch({ type: ADD_CARD_DATA, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCardData = (cardId) => async (dispatch) => {
    try {
      const { data } = await api.getCardData(cardId);
      dispatch({ type: GET_CARD_DATA, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteCardData = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCardData(id);
      dispatch({ type: DELETE_CARD_DATA, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  export const updateCardData = (dataInfo) => async (dispatch) => {
    try {
      const response = await api.updateCardData(dataInfo);
      dispatch({ type: UPDATE_CARD_DATA, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  






