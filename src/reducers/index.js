import { combineReducers } from "redux";
import login from "./login/login";
import card from "./card/card";
import cardData from "./cardData/cardData";
import step from "./step/step";
import user from "./user/user";

export const reducers = combineReducers({
 login,
 card,
 cardData,
 step,
 user

});
