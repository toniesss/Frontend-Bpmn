import axios from 'axios';

const BaseUrl = 'http://127.0.0.1:7000'

// Default Workflow List an
export const fetchWorkflowList = async (itemOffset, itemsPerPage, abortSignal,headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
  const res = await axios.get(`${BaseUrl}/process-definition/firstResult=${itemOffset}&maxResults=${itemsPerPage}&sortBy=version&sortOrder=desc&latestVersion=true`,
  config);
  return res.data;
};

export const fetchWorkflowCount = async (abortSignal,headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
  const res = await axios.get(`${BaseUrl}/process-definition/count/latestVersion=true`,config);
  return res.data.count;
};

export const  fetchSearchWorkflow = async (workflowName, itemOffset, itemsPerPage, abortSignal,headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
  console.log(workflowName, config)
  const res = await axios.get(
    `${BaseUrl}/process-definition/nameLike=${workflowName}&firstResult=${itemOffset}&maxResults=${itemsPerPage}&sortBy=version&sortOrder=desc&latestVersion=true`,
     config 
  );
  return res.data;
};

export const fetchWorkflowSearchCount = async (workflowName, abortSignal,headers) => {
  const config = {
    signal: abortSignal,
    headers: {
        'Authorization': `${headers.Authorization}` // Update with your token header key and value
    }
  }
  const res = await axios.get(
    `${BaseUrl}/process-definition/count/nameLike=${workflowName}&latestVersion=true`,
     config 
  );
  return res.data.count;
}

export const deleteWorkflow = async (deleteworkflow,headers) => {
  
    await axios.delete(`${BaseUrl}/process-definition/delete/${deleteworkflow}/`,{headers:headers});
}
