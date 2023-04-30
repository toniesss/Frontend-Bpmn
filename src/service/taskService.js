import axios from "axios";

const BaseUrl = 'http://127.0.0.1:7000'


export const fetchTasksList = async (abortSignal, itemOffset, itemsPerPage, userPosition, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.get(`${BaseUrl}/task/candidateGroup=${userPosition}&firstResult=${itemOffset}&maxResults=${itemsPerPage}/`,config);
    return res.data;
} 

export const fetchTasksListCount = async (abortSignal, userPosition, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.get(`${BaseUrl}/task/count/${userPosition}`,config);
    return res.data.count;
}

export const postTaskListSearch = async (abortSignal, itemOffset, itemsPerPage ,bodyrequestsearch, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.post(`${BaseUrl}/task/firstResult=${itemOffset}&maxResults=${itemsPerPage}`,bodyrequestsearch,config);
    return res.data;
}

export const postTaskCountSearch = async (abortSignal,bodyrequestsearch, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.post(`${BaseUrl}/task/search/count/`,bodyrequestsearch,config);
    return res.data.count;
}

export const getAllTaskCount = async () => {
    
}

export const fetchTaskVariables = async(abortSignal, taskid, headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
    const res = await axios.get(`${BaseUrl}/task/${taskid}/form-variables`,config);
    return res.data
}

export const deleteTask = async () => {

}

export const postTaskApprove = async (taskId, bodyrequest, headers) => {
    const res = await axios.post(`${BaseUrl}/task/${taskId}/complete`,bodyrequest, {
      headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
    });
    return res.data;
}

