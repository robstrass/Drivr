import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import imageReducer from './image';
import userImageReducer from './userImages';
import albumsReducer from './albums';
import commentsReducer from './comments'

// key is what's on state
const rootReducer = combineReducers({
    session: sessionReducer,
    image: imageReducer,
    userImage: userImageReducer,
    albums: albumsReducer,
    comments: commentsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
