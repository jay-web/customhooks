/*
todo - Write a useInterval custom hook that takes in a required callback function, and an optional delay as a number in milliseconds.
*      Calling useInterval with a callback and a delay should create an interval on mount, calling
*      the callback function every delay milliseconds.
*      If the component unmounts, the interval should be cancelled. If the delay changes, the interval
*      should reset, not executing the function until the new delay completes.
*      If the delay is ever set to null or undefined , the interval should be cancelled.
*      If the callback function changes, the interval should be updated to call the most recent version of
*      the function. However, this should not reset the interval.
*/

import React, { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const callbackRef = useRef();

  // * If callback changes, then only need to change the callback
  // * No need to reset the interval
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // * Create interval on mount of component or change in delay
  useEffect(() => {
    // * If delay is null or undefined, removed interval
    if (delay == null) return;

    let intervalID = setInterval(() => {
      callbackRef.current();
    }, delay);

    // * remove interval on unmount on component
    return () => {
      clearInterval(intervalID);
    };
  }, [delay]);
};

export default useInterval;
