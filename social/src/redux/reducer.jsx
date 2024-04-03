import { ALT_BAR_CONTACT_LOADING_STATE, ALT_SIDEBAR_STATE, CHANGE_BG_COLOR, CHAT_BOX_STATE, CHAT_BOX_TOGGLE_STATE, LOGOUT_STATE, RECIEVER_ID_ACTION, SIDEBAR_STATE, USER_STATE } from "./constant";

export const changeBackgroundColorReducer = (state = [], action) => {
  if (action.type === CHANGE_BG_COLOR) {
    return action.payload;
  } else {
    return state;
  }
};

export const logoutReducer = (state = [], action) => {
  if (action.type === LOGOUT_STATE) {
    if (action.payload === ''){
      action.payload = false
    }
    return action.payload;
  } else {
    return state;
  }
};

export const loginUserReducer = (state = [], action) => {
  if (action.type === USER_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const chatboxReducer = (state = [], action) => {
  if (action.type === CHAT_BOX_STATE) {
    return action.payload;
  } else {
    return state;
  }
};

export const chatboxToggleReducer = (state = [], action) => {
  if (action.type === CHAT_BOX_TOGGLE_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const altSidebarReducer = (state = [], action) => {
  if (action.type === ALT_SIDEBAR_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const altbarContactLoadingReducer = (state = [], action) => {
  if (action.type === ALT_BAR_CONTACT_LOADING_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const sidebarReducer = (state = [], action) => {
  if (action.type === SIDEBAR_STATE) {
    return action.payload;
  } else {
    return state;
  }
};
export const recieverIdReducer = (state = [], action) => {
  if (action.type === RECIEVER_ID_ACTION) {
    return action.payload;
  } else {
    return state;
  }
};