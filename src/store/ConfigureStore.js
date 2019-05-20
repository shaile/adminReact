import {createStore, combineReducers, applyMiddleware} from 'redux';  
import {StockReducer, StockByItemReducer} from '../reducer/StockReducer'; 
import thunk from 'redux-thunk';


export default () => {
    const store = createStore(
      combineReducers({
        items: StockReducer,
        itemDetail:StockByItemReducer
      }),
      applyMiddleware(thunk)
    );
  
    return store;
  };