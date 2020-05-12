
import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middleware = [thunk, reduxImmutableStateInvariant()];

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware)
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;