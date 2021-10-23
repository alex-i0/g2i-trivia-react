import * as React from 'react';
import { useReducer, createContext } from 'react';
import { Action, results } from '../reducers/results';

export interface State {
    score: number;
    answers: [];
}

const initialState: State = {
    score: 0,
    answers: []
};

interface AppContextInterface {
    state: {
        score: number;
        answers: [];
    };
}

const Context = createContext<AppContextInterface | Record<string, unknown>>({});

const combineReducers =
    (...reducers: any) =>
    (state: State, action: Action) => {
        for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
        return state;
    };

const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(combineReducers(results), initialState);
    const value = { state, dispatch };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
