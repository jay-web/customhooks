/*
todo - Write a useLocalStorage custom hook that takes in a required key as a string, and an optional initialValue .
*       Calling useLocalStorage in a component should save the initialValue in localStorage at the
*       given key when the component first mounts. If a value already exists at that key, the
*       initialValue parameter should be ignored.

*       The useLocalStorage function should return an array with the current value as the first element
*       and a setter function as the second element. The setter function should take in a new value as a
*       parameter and update localStorage at the original key .

*       When the setter function is called, the component should re-render, just as it would when a standard
*       piece of state is updated.

*       Any value added to localStorage should first be passed to JSON.stringify . When reading the value
*       from localStorage, JSON.parse should be used to parse the original value.


*/

import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  // ? If localstorage already have value with the passed key
  // ? then saved value will be used else initial passed value will used
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? initialValue
  );

  // ? On every render if key or value get changed
  // ? useEffect will update the value in localstorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
