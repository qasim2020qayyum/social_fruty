import { combineReducers } from "redux";
import {
  loginUserReducer,
  logoutReducer,
  changeBackgroundColorReducer,
  chatboxReducer,
  chatboxToggleReducer,
  altSidebarReducer,
  sidebarReducer,
  altbarContactLoadingReducer,
  recieverIdReducer,
} from "./reducer";

const rootRed = combineReducers({
  loginUserReducer,
  changeBackgroundColorReducer,
  logoutReducer,
  chatboxReducer,
  chatboxToggleReducer,
  altSidebarReducer,
  sidebarReducer,
  altbarContactLoadingReducer,
  recieverIdReducer,
});

export default rootRed;
