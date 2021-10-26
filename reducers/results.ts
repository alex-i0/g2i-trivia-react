import { State, Answer } from '../context/AppContextProvider';

type Reducer = 'GAME_FINISHED';

export type Action = {
    payload: {
        score: number;
        answers: Array<Answer>;
    };
    type: Reducer;
};

export const results = (state: State, action: Action): State => {
    console.log(action);
    switch (action.type) {
        case 'GAME_FINISHED':
            const { score, answers } = action.payload;
            return { ...state, score, answers };
        default:
            return state;
    }
};
