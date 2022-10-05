/*
todo - Write a useWindowSize custom hook used to track changes to the size of the browser window.
*       The useWindowSize hook should return an object with two properties:
*           width: The Current innerWidth of the window as a number.
*           height: The Current innerHeight of the window as a number.

*If either of these values changes, the hook should cause the component to re-render with the new values.

*In the event of a resize after an instance of a component using the useWindowSize hook is
*unmounted, any created event listeners should be removed.
*/

import React, {useEffect, useState} from "react";

const useWindowSize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight ] = useState(window.innerWidth);

    useEffect(() => {
        const updateWindowSize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
            window.addEventListener("resize", updateWindowSize);

            return () => {
                window.removeEventListener("resize", updateWindowSize);
            }

    }, [])


    return {width, height};
} 


export default useWindowSize;