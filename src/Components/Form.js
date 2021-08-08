import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayers } from '../actions/userAction';

function Form({ history }) {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const dispatch = useDispatch();

    function submitHandler() {
        if (player1 === '' || player2 === '') return;
        
        dispatch(addPlayers({
            player1, player2
        }));

        history.push('/tictactoe');
    }
    return (
        <div className='form'>
            <h2>Enter Player's Name </h2>
            <div className="form-group mt-3">
                <label htmlFor="player1">Player1</label>
                <input
                    type="text"
                    className="form-control"
                    id="player1"
                    onChange={(e) => setPlayer1(e.target.value)}
                    value={player1}
                />
            </div>
            <div className="form-group">
                <label htmlFor="player2">Player2</label>
                <input
                    type="text"
                    className="form-control"
                    id="player2"
                    onChange={(e) => setPlayer2(e.target.value)}
                    value={player2}
                />
            </div>

            <button onClick={submitHandler} className='btn btn-block btn-outline-warning'>Let's Play The Game</button>
        </div>
    )
}

export default Form;