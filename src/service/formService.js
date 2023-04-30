import axios from "axios";

const BaseUrl = 'http://127.0.0.1:7000'

export const fetchFormList = async (abortSignal, itemOffset, itemsPerPage, bodyRequestForm, headers ) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.post(`${BaseUrl}/process-instance/firstResult=${itemOffset}&maxResults=${itemsPerPage}`,bodyRequestForm,
    config);
    return res.data;
} 

export const fetchFormListCount = async (abortSignal, bodyRequestForm, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.post(`${BaseUrl}/process-instance/count/`,bodyRequestForm,config);
    return res.data.count;
} 

export const fetchFormListSearch = async (abortSignal, itemOffset, itemsPerPage, bodyRequestForm, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
  const res = await axios.post(
    `${BaseUrl}/process-instance/search&firstResult=${itemOffset}&maxResults=${itemsPerPage}`,
    bodyRequestForm,
    config
  );
  return res.data;
}

export const fetchFormListCountSearch = async (abortSignal, bodyRequestForm, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.post(`${BaseUrl}/process-instance/search/count/`,bodyRequestForm,
    config);
    return res.data.count;
}
