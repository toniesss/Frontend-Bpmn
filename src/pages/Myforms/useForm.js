import { useCallback, useEffect, useRef, useState,useContext } from "react";
import {
    fetchFormList,
    fetchFormListCount,
    fetchFormListSearch,
    fetchFormListCountSearch,
} from "../../service/formService";
import AuthContext from "../../context/AuthContext";

  const useForm = (
    searchShow, 
    itemOffset, 
    itemsPerPage,
    bodyRequestForm,
  ) => {
    const [formsList, setFormsList] = useState([]);
    const [formsCount, setFormsCount] = useState(0);
    const [isloading, setIsloading] = useState(false)

    const {authTokens, logoutUser} = useContext(AuthContext)
   
    const abortControllerRef = useRef(new AbortController());
  
    const fetchTaskListAndSearch = useCallback(async () => {
    const abortController = abortControllerRef.current;

    setIsloading(true)

      try {
        if(bodyRequestForm && authTokens) {
          const spance = ' '
          const headers = {
            'content-Type':'application/json',
            'Authorization':'Bearer' + spance + String(authTokens.access)
          } 
          const [list, count] = await Promise.all([
            searchShow
              ? fetchFormListSearch(abortController.signal, itemOffset, itemsPerPage, bodyRequestForm,headers)
              : fetchFormList(abortController.signal, itemOffset, itemsPerPage, bodyRequestForm,headers),
            searchShow
              ? fetchFormListCountSearch(abortController.signal, bodyRequestForm,headers)
              : fetchFormListCount(abortController.signal, bodyRequestForm,headers),
          ]);
          setFormsList(list);
          setFormsCount(count);
          setIsloading(false)
        }
      } catch (err) {
        console.log(err);
        setIsloading(false)
  
      }
    }, [authTokens, bodyRequestForm, itemOffset, itemsPerPage, searchShow]);

    useEffect(() => {
      if(bodyRequestForm) {
        fetchTaskListAndSearch();
      }
  
    }, [bodyRequestForm, fetchTaskListAndSearch]);

    
  
    return { formsList, formsCount, fetchTaskListAndSearch, isloading };
  };
  
  export default useForm;
  