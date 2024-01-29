import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  step: [],
  state: "idle",
  error: null,
  success: null,
};

export const stepReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_STEPS:
      return {
        ...state,
        step: action.payload.step,
      };
    case actionTypes.GET_STEPS:
      return {
        ...state,
        step: action.payload,
      };
    case actionTypes.UPDATE_STEPS:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
 
    case actionTypes.DELETE_STEPS:
      const stepIdToDelete = action.payload;
      return {
        ...state,
        step: state.step.data.filter((step) => step.id !== stepIdToDelete),
      };

    default:
      return state;
  }
};

export default stepReducer;
