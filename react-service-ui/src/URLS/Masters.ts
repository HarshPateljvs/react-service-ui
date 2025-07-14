import { REACTSERVICE } from "../Library/services/API/baseURL";


export const UserAPI = {
  GET_ALL: REACTSERVICE + 'User' + '/GetAllUsers',
  CREATE: REACTSERVICE + 'User',
  UPDATE: REACTSERVICE + 'User',

};

export const APPUserAPI = {
  CREATE: REACTSERVICE + 'AppUser',
};

export const AuthAPI = {
  LOGIN: REACTSERVICE + 'Auth/Login',
  REGISTER: REACTSERVICE + 'Auth/Register',
};

export const EmployeeAPI = {
  GET_ALL: REACTSERVICE + 'Employee' + '/GetAllEmployees',
  CREATE: REACTSERVICE + 'Employee',
  UPDATE: REACTSERVICE + 'Employee',
  DELETE: REACTSERVICE + 'Employee',
};

export const ChartAPI = {
  LINE_CHART: REACTSERVICE + "Chart/GetLineChartData",
  BAR_CHART: REACTSERVICE + "Chart/GetBarChartData",
  DONUT_CHART: REACTSERVICE + "Chart/GetDonutChartData",
  PIE_CHART: REACTSERVICE + "Chart/GetPieChartData",
};


