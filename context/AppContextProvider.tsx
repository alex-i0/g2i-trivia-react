import { useReducer, useCallback } from 'react';
import { Action, results } from '../reducers/results';
import AppContext from './AppContext';

export interface State {
    score: number;
    answers: Array<Answer>;
    setDispatch?: React.Dispatch<Action>;
}

export interface Answer {
    question: string;
    isCorrect: boolean;
}

const initialState: State = {
    score: 0,
    answers: []
};

const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(results, initialState);

    const setDispatch = useCallback((props) => dispatch(props), []);

    const value = { ...state, setDispatch };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
