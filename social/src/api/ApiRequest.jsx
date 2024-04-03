import axios from "axios";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000, 
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('Network error occurred. Please check your internet connection.');
    }
    return Promise.reject(error);
  }
);

export const ApiFetchReq = (methods, url, body) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const config = {
    method: methods,
    url,
    data: body,
    headers,
  };
  return instance(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // Handle other errors here, if needed
      console.error(err);
      throw err; // Re-throw the error to propagate it to the calling function
    });
};



