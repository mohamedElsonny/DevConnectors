import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [thunk];
const initialState = {};

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middlewares),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
