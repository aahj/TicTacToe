import { createStore, combineReducers } from "redux";
import { addPlayerReducer,updateScoreReducer } from './reducers/userReducer';

const reducer = combineReducers({
    player: addPlayerReducer,
    score:updateScoreReducer
});

const store = createStore(reducer);
store.subscribe(()=>console.log(store.getState()))
export default store;

