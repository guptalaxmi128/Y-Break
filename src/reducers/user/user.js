import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  user: [],
  state: "idle",
  error: null,
  success: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case actionTypes.GET_USERS:
      return {
        ...state,
        user: action.payload,
      };


    default:
      return state;
  }
};

export default userReducer;
