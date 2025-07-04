// Define the localhost once here
export const LOCALHOST = 'http://localhost';

// Define ports per service
export const BaseURL = {
  REACTSERVICE: `${LOCALHOST}:8001/api/`,
  DEMOSERVICE: `${LOCALHOST}:8002/api/`,
  // Add more services here
};
export const REACTSERVICE = BaseURL.REACTSERVICE;
export const DEMOSERVICE = BaseURL.DEMOSERVICE;