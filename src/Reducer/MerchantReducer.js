import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../action/UserAction'


const initialState = {
    merchant: null,
    loading: false,
}

const merchantReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                merchant: action.payload.merchant
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                merchant: null,
                error: action.payload
            }
        default:
            return state
    }
}

export default merchantReducer