import React, {useEffect, useReducer} from "react";

const reducer = (state, {type, responseJSON, error}) => {
    switch(type){
      case "loading":
        return {...state, isLoading: true}
      case "success":
        return {responseJSON, isLoading: false, error: null}
      case "error":
        return {responseJSON, isLoading: false, error}
      default:
        return new Error("No case matched")
    }
  }
  function useFetch(url) {
    
    const [state, dispatch] = useReducer(reducer, {
      responseJSON: null,
      isLoading: false,
      error: null
      
    });
  
    useEffect(() => {
      let shouldCancel = false
      dispatch({type: "loading"});
      const fetchData = async () => {
        try{
          let res = await fetch(url);
          let resJSON = await res.json();
          if(shouldCancel) return;
          dispatch({type: "success", responseJSON: resJSON});
        }catch(error){
          if(shouldCancel) return;
          dispatch({type: "error", error: error})
        }
        
      }
      fetchData();
  
      return () => {
        shouldCancel = true;
      }
    }, [url])
  
    return state;
  }
  
  export default useFetch;
  