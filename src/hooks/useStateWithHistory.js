import React , {useState, useRef} from "react";

const UseStateWithHistory = (initialState) => {
    const [state, setInternalState ] = useState(initialState);
    const history = useRef([state]);
    const historyIndex = useRef(0);

    const setState = (newValue) => {
        history.current.push(newValue);
        historyIndex.current = history.current.length - 1;
        setInternalState(newValue);
    };

    const goBack = () => {
        if(historyIndex.current == 0) return;

        historyIndex.current--;
        setInternalState(history.current[historyIndex.current]);
    }

    const goForward = () => {
        if(historyIndex.current >= history.current.length - 1) return;

        historyIndex.current++;
        setInternalState(history.current[historyIndex.current]);

    }

    return [state, setState, goBack, goForward, history.current];
}

export default UseStateWithHistory;