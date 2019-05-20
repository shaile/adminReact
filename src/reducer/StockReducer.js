import * as ActionTypes from '../action/ActionTypes';
const InitialState = {
    search: '' ,
    isLoading:true,
    item:[]
}
export const StockReducer = (state = InitialState, action) => {
    switch(action.type) {
        case ActionTypes.LOADING:
            return {...state, isLoading: true}   
        case ActionTypes.FILTER_SUCCESS:
            return Object.assign({}, state, {
            isLoading: false, 
            item: action.items
        })
        case ActionTypes.FITER_FAILURE:
            return Object.assign({}, state, {
            item: action.err,
            isLoading: false,
        })  
        case ActionTypes.LOAD_ITEM_SUCCESS:
            return {...state, isLoading: false};
    default: 
        return state;
    }   
  }


const InitialDetailState = {
    isLoading:true,
    detail:[],
    erro:[]
}
export const StockByItemReducer = (state = InitialDetailState, action) => {
    switch(action.type) {
        case ActionTypes.LOADING:
            return {...state, isLoading: true}  
        case ActionTypes.LOAD_ITEM_BODY_SUCCESS: 
            return {...state, isLoading: false, detail:action.itemDetail};
        case ActionTypes.LOAD_ITEM_BODY_FAILURE:
            return {...state, isLoading: false, erro:action.err}     
    default: 
        return state;
    }   
  }