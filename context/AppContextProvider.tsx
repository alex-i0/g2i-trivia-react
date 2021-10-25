import { useMemo, useReducer } from 'react';
import { results } from '../reducers/results';
import AppContext from './AppContext';

export interface State {
    score: number;
    answers: Array<Answer>;
}

interface Answer {
    question: string;
    isCorrect: boolean;
}

const initialState: State = {
    score: 0,
    answers: []
};

const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(results, initialState);

    const value = useMemo(() => ({ ...state, dispatch }), []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
