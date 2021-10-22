import { useReducer, createContext } from 'react';
import { results } from '../reducers/results';

export interface State {
    score: number;
    answers: [];
}

const initialState: State = {
    score: 0,
    answers: []
};

const Context = createContext({});

const combineReducers =
    (...reducers: any) =>
    (state: State, action: any) => {
        for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
        return state;
    };

const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(combineReducers(results), initialState);
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
