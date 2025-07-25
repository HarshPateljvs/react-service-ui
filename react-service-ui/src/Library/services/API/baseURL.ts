// Define the localhost once here
export const LOCALHOST = import.meta.env.VITE_API_BASE;
//export const LOCALHOST = 'http://www.reactserviceui.com';


// Define ports per service
export const BaseURL = {
  REACTSERVICE: `${LOCALHOST}:8001/api/`,
  DEMOSERVICE: `${LOCALHOST}:8002/api/`,
  // Add more services here
};
export const REACTSERVICE = BaseURL.REACTSERVICE;
export const DEMOSERVICE = BaseURL.DEMOSERVICE;