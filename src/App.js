import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TicTacToe from './Components/TicTacToe';
import Form from './Components/Form';

function App() {
  return (
    <>
    <div className='App'>
      <Router>
        <Route exact path='/' component={Form} />
        <Route path='/tictactoe' component={TicTacToe} />
      </Router>
    </div>
    </>
  )
}

export default App
