import * as ActionTypes from "./ActionTypes";
const baseUrl = ' https://api.iextrading.com/1.0/stock/'


export const loading = () => ({
    type: ActionTypes.LOADING
  });


export const filterItemsSuccess = items => ({
    type: ActionTypes.FILTER_SUCCESS,
    items
});
  
export const filterError = err => ({
    type: ActionTypes.FITER_FAILURE,
    err
})

export const fiterItems = inputquote => async _dispatch => {
    _dispatch(loading());
    try {
        const resultItems = await fetch(baseUrl + `${inputquote}/peers`);
        let data = await resultItems.json();
        return _dispatch(filterItemsSuccess(data));
    }
    catch (err) {
        return _dispatch(filterError(err));
    }
};

 
export const getItems = () => ({
    type: ActionTypes.LOAD_ITEM_SUCCESS
})


export const getItemDetailSuccess = itemDetail => ({
    type: ActionTypes.LOAD_ITEM_BODY_SUCCESS,
    itemDetail
});
  
export const getItemDetailError = err => ({
    type: ActionTypes.LOAD_ITEM_BODY_FAILURE,
    err
})

export const getItemDetail = inputquote => async _dispatch => {
    try {
        const resultItems = await fetch(baseUrl + `${inputquote}/company`);
        let data = await resultItems.json();
        return _dispatch(getItemDetailSuccess(data));
    }
    catch (err) {
        return _dispatch(getItemDetailError(err));
    }
};

