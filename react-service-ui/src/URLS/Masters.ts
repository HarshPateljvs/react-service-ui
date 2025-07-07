import { REACTSERVICE } from "../Library/services/API/baseURL";


export const UserAPI = {
  GET_ALL: REACTSERVICE+'User'+'/GetAllUsers',
  CREATE: REACTSERVICE+'User',
  UPDATE: REACTSERVICE+'User',

};

export const AuthAPI  = {
  LOGIN: REACTSERVICE+'Login',
};