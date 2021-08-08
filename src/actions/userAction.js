import { ADD_USER,UPDATE_SCORE1,UPDATE_SCORE2 } from '../Constants/const';

export function updatePlayer1Score(playerData) {
    return {
        type: UPDATE_SCORE1,
        payload: playerData
    }
}

export function updatePlayer2Score(playerData) {
    return {
        type: UPDATE_SCORE2,
        payload: playerData
    }
}


export function addPlayers(players){
    return {
        type: ADD_USER,
        payload: players
    }
}