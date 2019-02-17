import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import { BrowserRouter, Route, Switch, Redirect, matchPath } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import Login from './components/Login';
import Logout from './components/Logout';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './reducer/timelineReducer';
import { header } from './reducer/headerReducer';
import { Provider } from 'react-redux';

const reducers = combineReducers({ timeline, header });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const history = createHistory({
    basename: "",
    forceRefresh: false
});

export { history }

function verificaAutenticacao(nextState, replace) {
    const match = matchPath('/timeline', {
        path: nextState.match.url,
        exact: true
    })

    let isValid = false
    if (match !== null) {
        isValid = match.isExact
    }

    if (isValid && localStorage.getItem('auth-token') === null) {
        return <Redirect to={{
            pathname: '/',
            state: { message: 'Faça login para acessar esta página' }
        }} />
    }
    return <App />
}

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/timeline/:login?" render={verificaAutenticacao} />
                <Route path="/logout" component={Logout} />
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
