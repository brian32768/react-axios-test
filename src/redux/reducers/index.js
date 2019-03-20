import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    formReducer,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
