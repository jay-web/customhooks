/*
todo - Write a useFetch custom hook that takes in a required url as a string or URL object. This
todo   parameter should be directly passed to the native JavaScript fetch function.

*     Calling useFetch in a component should make a fetch request when an instance of the component
*     is mounted. Additionally, a new request should be issued on any render where the url has changed.

*     The useFetch function should return an object with three keys:
*       responseJSON: The JSON response from the most recent call to fetch . If no response has
*               been received yet or the most recent request resulted in an error, this should be null.

*       isLoading: When a fetch request is issued, this should be set to true , and set to false when
*               the response comes back or an error is thrown.

*       error: If the most recent call to fetch threw an error or retrieving the JSON from the most
*           recent response threw an error, the error should be saved in this value, otherwise it should be null.

*     In the event that the url changes before the previous fetch request returns, the response from that
*     previous request should not be used in order to prevent a race condition

*/

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
  