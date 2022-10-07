/*
todo : Write a useMap custom hook that works as a wrapper around the native JavaScript Map object. The
*      function takes in a single optional intialValue parameter, which is passed directly to the Map constructor during the initial render.
*      The useMap function should create a Map on mount and return an object with the following properties:
!       map : The underlying Map object.
!       set(key, value) : A function to add a new key-value pair to the Map or to override the value of an existing key.
!       delete(key) : A function to delete a key from the Map if it exists.
!       clear() : A function to clear out all entries from the map.

*      All three of the returned functions (set, delete, and clear) should be static, meaning that the same
*       function should be returned on every render for a given usage of useMap in a component instance.
*       However, the map itself does not need to be static. Calling any of these functions should cause the
*       component instance to rerender.

*/

import React, {useCallback, useState} from "react";


function useMap(initialValue){
    const[map, setMap ] = new Map(initialValue);

    // ? Set function to set the new values in map
    // * using useCallback, to make function static (means will not create itself on every render)
    const set = useCallback((key, value) => {
        setMap((prevMap) => {
            let newMap = new Map(prevMap);
            newMap.set(key, value);
            return newMap;
        })
    },[]);

     // ? Delete function to delete the values from map
    // * using useCallback, to make function static (means will not create itself on every render)

    const deleteValue = useCallback((key) => {
        setMap((prevMap) => {
            let newMap = new Map(prevMap);
            newMap.delete(key);
            return newMap;
        })
    },[]);

    const clear = useCallback(() => {
        setMap(new Map())
    },[]);

    return {map, set, delete:deleteValue, clear};
}