import { useCallback, useEffect, useRef, useState, useContext } from "react";
import {
  fetchTasksList,
  fetchTasksListCount,
  fetchTaskVariables,
  postTaskCountSearch,
  postTaskListSearch,
  postTaskApprove
} from "../../service/taskService";
import AuthContext from "../../context/AuthContext";


const useTask = (
  searchShow, 
  itemOffset, 
  itemsPerPage,
  userPosition,
  bodyrequestsearch,
  logoutUser
) => {
  const [taskList, setTaskList] = useState([]);
  const [taskCount, setTaskCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVariables, setIsLoadingVariables] = useState(false);
  const [variablesAndTaskList, setVariablesAndTaskList] = useState();

  console.log(variablesAndTaskList)

  const abortControllerRef = useRef(new AbortController());

  const {authTokens} = useContext(AuthContext)
  const spance = ' '


  const fetchTaskListAndSearch = useCallback(async () => {
    const abortController = abortControllerRef.current;
    setIsLoading(true)
    try {
      if(userPosition && authTokens) {
        const headers = {
          'content-Type':'application/json',
          'Authorization':'Bearer' + spance + String(authTokens.access)
        }
        const [list, count] = await Promise.all([
          searchShow
            ? postTaskListSearch(abortController.signal, itemOffset, itemsPerPage, bodyrequestsearch, headers)
            : fetchTasksList(abortController.signal, itemOffset, itemsPerPage, userPosition, headers),
          searchShow
            ? postTaskCountSearch(abortController.signal, bodyrequestsearch, headers)
            : fetchTasksListCount(abortController.signal, userPosition, headers),
        ]);
      console.log(list)
      setTaskList(list);
      setTaskCount(count);
      setIsLoading(false)
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false)
        logoutUser()
    } finally {
      setIsLoading(false)
    }
  }, [authTokens, bodyrequestsearch, itemOffset, itemsPerPage, logoutUser, searchShow, userPosition]);


  useEffect(() => {
    const abortController = abortControllerRef.current;

    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }
  
    if (taskList && !isLoadingVariables) {
      setIsLoading(true);
      Promise.all(taskList.map((task) => fetchTaskVariables(abortController.signal, task.id, headers)))
        .then((data) => {
          const resulttask = taskList.map((task, i) => ({ ...task, ...data[i] }));
          setVariablesAndTaskList(resulttask);
          setIsLoading(false);
        })
        .catch((err) => {
          logoutUser()
          console.log(err);
          setIsLoading(false);
        })
        .finally(() => setIsLoadingVariables(false));
    }
  }, [taskList, isLoadingVariables, authTokens.access, logoutUser]);



    const handdleAppove = async (taskId) => {
      const bodyrequest = {
        variables: { decision: { value: "Approve" } },
      };
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      try {
        await postTaskApprove(taskId, bodyrequest, headers)
        .then(() => fetchTaskListAndSearch())
      } catch (err) {
        logoutUser()
        console.log(err);
      }
    };

    const handdleReject = async (taskId) => {
      const bodyrequest = {
        variables: { decision: { value: "Reject" } },
      };
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      try {
        await postTaskApprove(taskId, bodyrequest, headers)
        .then(() => fetchTaskListAndSearch())
      } catch (err) {
          logoutUser()
        console.log(err);
      }
    };


    const handleapprovemultiple = async (taskIds) => {
      try {
        const promises = taskIds.map(async (id) => {
          const bodyrequest = {
            variables: { decision: { value: "Approve" } },
          };
          const headers = {
            'content-Type':'application/json',
            'Authorization':'Bearer' + spance + String(authTokens.access)
          }
          try {
            await postTaskApprove(id, bodyrequest, headers);
          } catch (err) {
              logoutUser()
            console.error(err);
          }
        });
        await Promise.allSettled(promises);
        fetchTaskListAndSearch();
      } catch (err) {
        console.error(err);
        logoutUser()
      }
    };
      

  useEffect(() => {
    fetchTaskListAndSearch();
  }, [fetchTaskListAndSearch]);


  return { taskList, taskCount, fetchTaskListAndSearch, variablesAndTaskList, isLoading, handdleAppove, handdleReject, handleapprovemultiple };
};

export default useTask

//*-------------------------**-------------------------------**


