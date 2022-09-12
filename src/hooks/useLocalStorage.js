import {useState, useEffect} from "react";

const useLocalStorage = (key, initialValue) => {
    // ? If localstorage already have value with the passed key
    // ? then saved value will be used else initial passed value will used
    const [value, setValue] = useState(
        () => JSON.parse(localStorage.getItem(key)) ?? initialValue );



    // ? On every render if key or value get changed
    // ? useEffect will update the value in localstorage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;