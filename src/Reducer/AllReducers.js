import { combineReducers } from 'redux'

const { default: tokenReducer } = require("./TokenReducers");
const { default: merchantReducers } = require("./MerchantReducer");
const { default: siteReducer } = require("./SiteReducers");

const allReducers = combineReducers({
    merchant: merchantReducers,
    mToken: tokenReducer,
    site: siteReducer
})
export default allReducers