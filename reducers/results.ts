import { State } from '../context/AppContext';

export enum Reducer {
    GAME_FINISHED = 'GAME_FINISHED'
}

export const results = (state: State, action: any): State => {
    switch (action.type) {
        case Reducer.GAME_FINISHED:
            const { score, answers } = action.payload;
            return { ...state, score, answers };
        default:
            return state;
    }
};
