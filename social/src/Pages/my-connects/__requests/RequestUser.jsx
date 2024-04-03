import { ApiFetchReq } from "../../../api/ApiRequest"

// user Request
export const getUserToConnectReq = async () => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/fruit/user/social/allusers`)
}


// http://localhost:5000/social/contacts/delete/659bfe00e8dd4c1032cff9d5/659bb7ad8cf57ad35bfcf2fd
export const unFollowPersonReq = async (user_id, created_by) => {
  return await ApiFetchReq('DELETE', `${process.env.REACT_APP_BASE_URL}/social/contacts/delete/${user_id}/${created_by}`)
}


// http://localhost:5000/social/contacts/add/:user_id/:created_by
export const postFollowPersonReq = async (user_id, created_by) => {
  return await ApiFetchReq('POST', `${process.env.REACT_APP_BASE_URL}/social/contacts/add/${user_id}/${created_by}`)
}