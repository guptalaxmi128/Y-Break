import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  card: [],
  cardById: [],
  state: "idle",
  error: null,
  success: null,
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CARD:
      return {
        ...state,
        card: action.payload.card,
      };
    case actionTypes.GET_CARD:
      return {
        ...state,
        card: action.payload,
      };
    case actionTypes.UPDATE_CARD:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.GET_CARD_BY_ID:
      return {
        ...state,
        cardById: action.payload,
      };
    case actionTypes.DELETE_CARD:
      const cardIdToDelete = action.payload;

      return {
        ...state,
        card: state.card.data.filter((card) => card.id !== cardIdToDelete),
      };

    default:
      return state;
  }
};

export default cardReducer;
