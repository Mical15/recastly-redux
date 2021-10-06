import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './../reducers/main.js';
import exampleVideoData from '../data/exampleVideoData.js';

// TODO:  Create your redux store, apply thunk as a middleware, and export it!
const initialState = {
  videoList: exampleVideoData,
  currentVideo: exampleVideoData[0],
};

const store = createStore(rootReducer, initialState, applyMiddleware(ReduxThunk));

export default store;
