import axios from 'axios';
import request from 'request';

// Axios Get Call - get the HTML page
export const getAxiosCall = async (url: string) => {
  try {
      const response = await axios({method: 'get', url: url});
      return response.data;
  }
  catch(error){
      return error.response;
  }
}