import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import burgerBuilderReducer from "./Store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import orderReducer from "./Store/reducers/order";
import authReducer from "./Store/reducers/auth";

 const combineReducer = combineReducers({
     burgerBuilder: burgerBuilderReducer,
     order: orderReducer,
     auth: authReducer
 });
const store = createStore(combineReducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
