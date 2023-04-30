import { useEffect, useState, useCallback, useRef,useContext } from "react";
import {
  fetchSearchWorkflow,
  fetchWorkflowSearchCount,
  fetchWorkflowList,
  fetchWorkflowCount,
  deleteWorkflow,
} from "../../service/workflowService";
import AuthContext from "../../context/AuthContext";

export const useWorkflow = (
  itemOffset,
  itemsPerPage,
  searchShow,
  workflowName
) => {
  const [workflowList, setWorkflowList] = useState([]);
  const [workflowCount, setWorkflowCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoadingWorkflowList, setIsLoadingWorkflowList] = useState(false); // Add loading state
  const abortControllerRef = useRef(new AbortController());

  const {authTokens} = useContext(AuthContext)

  const fetchWorkflowListAndCount = useCallback(async () => {
    const abortController = abortControllerRef.current;
    const spance = ' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }
    try {
      setIsLoadingWorkflowList(true); // Set loading state to true
      let list = [];
      let count = [];
      if (searchShow === true && authTokens) {
        [list, count] = await Promise.all([
          fetchSearchWorkflow(
            workflowName,
            itemOffset,
            itemsPerPage,
            abortController.signal,
            headers
          ),
          fetchWorkflowSearchCount(workflowName,abortController.signal,headers),
        ]);
      } else {
        [list, count] = await Promise.all([
          fetchWorkflowList(itemOffset, itemsPerPage, abortController.signal,headers),
          fetchWorkflowCount(abortController.signal,headers),
        ]);
      }

      setWorkflowList(list);
      setWorkflowCount(count);
      setError(null);
      setIsLoadingWorkflowList(false); // Set loading state to false
    } catch (err) {
      setError(err.message);
      setIsLoadingWorkflowList(false); // Set loading state to false
    }
  }, [authTokens, itemOffset, itemsPerPage, searchShow, workflowName]);

    const deleteWorkflowData = useCallback(async (deleteworkflow) => {
      try {
        await deleteWorkflow(deleteworkflow)

        .then(()=> fetchWorkflowListAndCount())
        
      } catch (err) {
        setError(err.message);
      }
    }, [fetchWorkflowListAndCount]);
      

  useEffect(() => {
    fetchWorkflowListAndCount();
  }, [fetchWorkflowListAndCount]);

  return { workflowList, fetchWorkflowListAndCount, workflowCount, deleteWorkflowData, error, isLoadingWorkflowList }; // Return loading state
};





//---------------------------*------------------------------------------------------//



