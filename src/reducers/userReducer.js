import { ADD_USER, UPDATE_SCORE1, UPDATE_SCORE2 } from '../Constants/const';

const scoreInitialState = {
    _player1: {
        name: '',
        score: 0
    },
    _player2: {
        name: '',
        score: 0
    }
};

const playerInitialState = {
    player1: '',
    player2: ''
}
export function updateScoreReducer(state = scoreInitialState, action) {
    switch (action.type) {
        case UPDATE_SCORE1:
            state._player1.name = action.payload.winnerName;
            state._player1.score = state._player1.score + action.payload.score;
            return { ...state };

        case UPDATE_SCORE2:
            state._player2.name = action.payload.winnerName;
            state._player2.score = state._player2.score + action.payload.score;
            return { ...state };

        default:
            return state;
    }
};
export function addPlayerReducer(state = playerInitialState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                state: action.payload
            }
        default:
            return state;
    }
}