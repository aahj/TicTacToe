import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayer1Score, updatePlayer2Score } from '../actions/userAction'
import '../App.css';

const initialState = [];
function TicTacToe() {
    const { player1, player2 } = useSelector(state => state.player.state || '');
    const { _player1, _player2 } = useSelector(state => state.score);

    const dispatch = useDispatch();

    const [matrix, setMatrix] = useState(initialState);
    const [matrixSize, setMatrixSize] = useState(3);
    const [currentPlayer, setCurrentPlayer] = useState('o');
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCol, setSelectedCol] = useState(null);
    const [winner, setWinner] = useState(false);
    const [reset, setReset] = useState(false);
    const [draw, setDraw] = useState(false);
    const [n, setN] = useState(null);

    // paint the matrix on first Render
    useEffect(() => {
        setWinner(false);
        setSelectedRow(null);
        setSelectedCol(null);
        setDraw(false);
        setN(null);

        // create row
        // fill(null) becuase at initial all the blocks will be empty
        const row = new Array(matrixSize).fill(null);
        let tempMatrix = [];
        for (let i = 0; i < matrixSize; i++) {
            // [...row] becuase to create copy of row
            tempMatrix.push([...row]);
        }
        setMatrix(tempMatrix);

    }, [reset]);

    function squareBlockHandler(row, col) {

        // to check if match is draw
        setN(n + 1);

        // set the selected box [row and col coordinates]
        setSelectedCol(col);
        setSelectedRow(row);

        // if there is nothing inside matrix or block i.e ( !matrix[row][col] ), then it should be clickable
        // else not clickable again
        if (!matrix[row][col] && !winner) {
            let nextPlayer = currentPlayer === 'x' ? 'o' : 'x';
            setCurrentPlayer(nextPlayer);

            // set player inside the matrix
            let matrixCopy = [...matrix];
            matrixCopy[row][col] = nextPlayer;
            setMatrix(matrixCopy);
        }

    };

    function isWinner() {
        let vertical = true;
        let horizontal = true;
        let diagonal1 = true;
        let diagonal2 = true;

        if (selectedRow === null || selectedCol === null) return;

        for (let i = 0; i < matrixSize; i++) {
            // in column, if found any opponent then set it to false
            // i.e  either 3[X] or 3[O] should be in column; similar to rows and diagonal

            if (matrix[i][selectedCol] !== currentPlayer) {
                vertical = false;
            }
            if (matrix[selectedRow][i] !== currentPlayer) {
                horizontal = false;
            }
            if (matrix[i][i] !== currentPlayer) {
                diagonal1 = false;
            }
            if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
                diagonal2 = false;
            }
        }
        // if any of them is true, then declare winner
        if (vertical || horizontal || diagonal1 || diagonal2) {
            setWinner(true);
            return;
        }
        // if all blocks are filled, then match is tie/draw
        if (n === 9) {
            setDraw(true);
            return;
        }
    };

    // check winner on every update
    useEffect(() => {
        isWinner();
    });

    useEffect(() => {
        if (winner) {
            let winnerName = currentPlayer === 'x' ? player1 : player2;

            if (winnerName === player1) {
                dispatch(updatePlayer1Score({
                    winnerName,
                    score: 1
                }));
            }
            else {
                dispatch(updatePlayer2Score({
                    winnerName,
                    score: 1
                }));
            }

        }
    }, [winner,dispatch])

    function resetHandler() {
        setReset(!reset);
    }

    return (
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
                <button onClick={resetHandler}>Reset</button>
                <div>
                    {
                        matrix.map((val, col) => (
                            <div className='_col'>
                                {
                                    val.map((val1, row) => (
                                        <div onClick={() => squareBlockHandler(row, col)} className='_row'>
                                            {matrix[row][col]}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <div className='winner-area mt-5'>
                    <h4>
                        {winner ?
                            currentPlayer === 'x' ? `Player ${_player1.name} is winner` : `Player ${_player2.name} is winner`
                            : <div></div>
                        }
                    </h4>
                    <h4>{draw ? `Match Draw` : ''}</h4>
                </div>
            </div>

            <div className=' col-md-3 scoreboard'>
                {
                    winner ?
                        <ul>
                            <li >
                                <p >{player1.toUpperCase()} : {_player1.score}</p>
                            </li>
                            <li >
                                <p >{player2.toUpperCase()} : {_player2.score}</p>
                            </li>
                        </ul>
                        :
                        <div></div>
                }

            </div>
        </div>
    );
}

export default TicTacToe;
