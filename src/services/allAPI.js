import commonAPI from './commonAPI';
import SERVER_BASE_URL from './serverURL';


// add post
export const addMenuAPI = async (reqBody, reqHeader) => {
    try {
      const response = await commonAPI('POST',`${SERVER_BASE_URL}/addMenu`,reqBody,reqHeader);
      return response; 
    } catch (error) {
      console.error('Error in addMenuAPI:', error);
      throw error;
    }
  };

  // get all menu items
  export const getAllMenuAPI = async () => {
    try {
        const response = await commonAPI('GET',`${SERVER_BASE_URL}/getAllMenu`);
        console.log("API Response:", response.data);  // Debug log
        return response;
    } catch (error) {
      console.log(error);
      
    }
};
