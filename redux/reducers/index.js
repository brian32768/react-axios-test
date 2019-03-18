import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    formReduxer,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
