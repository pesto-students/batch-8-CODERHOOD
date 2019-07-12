
import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

const callApi = async (method, url, data) => {
  try {
    return await axios({
      method,
      url: `${baseURL}${url}`,
      data: data,
    });
  } catch (error) {
    return error.message;
  }
};

export default callApi;