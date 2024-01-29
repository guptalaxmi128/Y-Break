import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  cardData: [],
  state: "idle",
  error: null,
  success: null,
};

export const cardDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CARD_DATA:
      return {
        ...state,
        cardData: action.payload.cardData,
      };
    case actionTypes.GET_CARD_DATA:
      return {
        ...state,
        cardData: action.payload,
      };
    case actionTypes.UPDATE_CARD_DATA:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.DELETE_CARD_DATA:
      const cardDataIdToDelete = action.payload;

      return {
        ...state,
        cardData: state.cardData.data.filter(
          (cardData) => cardData.id !== cardDataIdToDelete
        ),
      };

    default:
      return state;
  }
};

export default cardDataReducer;
