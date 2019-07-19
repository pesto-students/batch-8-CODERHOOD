import axios from 'axios';

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
    return message;
  }
};

export default callApi;