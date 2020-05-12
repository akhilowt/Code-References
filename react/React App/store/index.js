
import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import logger from 'redux-logger'
import { Provider } from "react-redux";
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

//const middleware = [thunk, reduxImmutableStateInvariant()];
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, logger),
    // compose(
    //     applyMiddleware(...sagaMiddleware,logger)
    //     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);
sagaMiddleware.run(rootSaga);

export default store;