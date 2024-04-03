import { ALT_BAR_CONTACT_LOADING_STATE, ALT_SIDEBAR_STATE, CHANGE_BG_COLOR, CHAT_BOX_STATE, CHAT_BOX_TOGGLE_STATE, LOGOUT_STATE, RECIEVER_ID_ACTION, SHOW_NAME, SIDEBAR_STATE, USER_STATE } from "./constant";


export const changeBackgroundColor = (name) => {
    return {
      type: CHANGE_BG_COLOR,
      payload: name,
    };
  };

  export const logoutAction = (logoutState) => {

    return {
      type: LOGOUT_STATE,
      payload: logoutState,
    };
  };
  
  export const userAction = (userState) => {
    return {
      type: USER_STATE,
      payload: userState,
    };
  };
  // chatbox
  export const chatboxAction = (userState) => {
    return {
      type: CHAT_BOX_STATE,
      payload: userState,
    };
  };
  export const chatboxToggleAction = (userState) => {
    return {
      type: CHAT_BOX_TOGGLE_STATE,
      payload: userState,
    };
  };
  // chatbox
  // sidebar 
  export const altSidebarAction = (userState) => {
    return {
      type:  ALT_SIDEBAR_STATE,
      payload: userState,
    };
  };
  export const altSidebarContactLoadingAction = (userState) => {
    return {
      type:  ALT_BAR_CONTACT_LOADING_STATE,
      payload: userState,
    };
  };
  export const sidebarAction = (userState) => {
    return {
      type:  SIDEBAR_STATE,
      payload: userState,
    };
  };
  
  
  // messages 
  export const recieverIdAction = (userState) => {
    return {
      type:  RECIEVER_ID_ACTION,
      payload: userState,
    };
  };