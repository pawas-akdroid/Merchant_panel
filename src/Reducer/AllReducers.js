import { combineReducers } from 'redux'

const { default: tokenReducer } = require("./TokenReducers");
const { default: merchantReducers } = require("./MerchantReducer");
const { default: siteReducer } = require("./SiteReducers");

const allReducers = combineReducers({
    merchant: merchantReducers,
    token: tokenReducer,
    site: siteReducer
})
export default allReducers