import { ApiFetchReq } from "../../../../api/ApiRequest"

// http://localhost:5000/social/contacts/65d9bdf5162c053689851af8
export const getContactsReq = async (created_by) => {
  return await ApiFetchReq('GET', `${process.env.REACT_APP_BASE_URL}/social/contacts/${created_by}`)
}
