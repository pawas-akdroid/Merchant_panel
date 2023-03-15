import { FETCH_TOKEN_BEGIN, FETCH_TOKEN_FAILURE, FETCH_TOKEN_SUCCESS } from '../action/Token'

const initialState = {
    mToken: null,
    loading: false,
}

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOKEN_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                mToken: action.payload.mToken
            }
        case FETCH_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                token: null,
                error: action.payload
            }
        default:
            return state
    }
}

export default tokenReducer