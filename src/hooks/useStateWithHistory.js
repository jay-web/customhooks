/*
todo - Write a useStateWithHistory custom hook that takes in an initialState value.
*   - Calling useStateWithHistory should work the same as useState , but with an added history with
*   - the ability to scroll through previous state values.

*   - The useStateWithHistory hook should return an array with five entries in this order:
*       1. The current value.
*       2. A setter function to update the value. This function should take in the new value as a parameter,
*           just like the setter function returned by useState .
*       3. A function to "go back" to the previous state value. Calling this function should update the state
*           to the previous value, and it should cause a re-render just as setting the state to a new value
*           would. If there is no previous state value, this function should have no effect.
*       4. A function to "go forward" to the next state value. Calling this function should update the state to
*           the next value in the history, and it should cause a re-render just as setting the state to a new
*           value would. If there is no next value in the history, this function should have no effect.
*       5. The history of values as an array, initially containing only the initial value. Every time the setter
*           function is called, the new value should be appended to the end of the history array.
      
*   If the setter function is called after having gone backwards to a previous value, the value should be
*   updated to the new value. The new value should be appended to the end of the history array as if "go
*   forwards" had been called until reaching the end of the history array before setting a new value.

*/
import React, { useState, useRef } from "react";

const UseStateWithHistory = (initialState) => {
  const [state, setInternalState] = useState(initialState);
  const history = useRef([state]);
  const historyIndex = useRef(0);

  const setState = (newValue) => {
    history.current.push(newValue);
    historyIndex.current = history.current.length - 1;
    setInternalState(newValue);
  };

  const goBack = () => {
    if (historyIndex.current == 0) return;

    historyIndex.current--;
    setInternalState(history.current[historyIndex.current]);
  };

  const goForward = () => {
    if (historyIndex.current >= history.current.length - 1) return;

    historyIndex.current++;
    setInternalState(history.current[historyIndex.current]);
  };

  return [state, setState, goBack, goForward, history.current];
};

export default UseStateWithHistory;
