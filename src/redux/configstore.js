import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers'

const persistConfig = {
    key: "root",
    storage,
}

const pReducer = persistReducer(persistConfig, reducer)

export default () => {
    let store = createStore(pReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}
