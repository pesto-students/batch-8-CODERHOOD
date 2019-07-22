import axios from 'axios';
import { toast } from 'bulma-toast'

const baseURL = process.env.REACT_APP_API_ENDPOINT;

const callApi = async (method, url, data) => {
  try {
    return await axios({
      method,
      url: `${baseURL}${url}`,
      data: data,
    });
  } catch (error) {
    const { message } = error.response.data;    
    toast({
      message,
      type: 'is-danger',
      duration: 4000,
      dismissible: true,
      closeOnClick: true,
      position: 'bottom-left',
    });
  }
};

export default callApi;