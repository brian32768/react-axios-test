import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const persistConfig = {
    key: "root",
    storage,
}

const enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(pReducer
        // add enhancedCompose here
    )
    let persistor = persistStore(store)
    return { store, persistor }
}
