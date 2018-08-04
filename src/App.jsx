import React from 'react';
import thunk from 'redux-thunk';

import { render } from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';

import AboutPage from './pages/about/About';


import ContactPage from './pages/contact/Contact';


import HomePage from './pages/home/Home';


import SubmitPage from './pages/submit/Submit';


import conferencesReducer from './reducers/conferences';

import filterReducer from './reducers/filter';

import submitReducer from './reducers/submit';

import geocodeReducer from './reducers/geocode';

import MainTemplate from './templates/main/Main';

import './App.sass';

const router = routerMiddleware(browserHistory);

const store = createStore(
	combineReducers({
		routing: routerReducer,
		conferences: conferencesReducer,
		filter: filterReducer,
		submit: submitReducer,
		geocode: geocodeReducer
	}),
	applyMiddleware(
		thunk,
		router
	)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={ MainTemplate }>
				<IndexRoute component={ HomePage } />
				<Route path="about" component={ AboutPage } />
				<Route path="contact" component={ ContactPage } />
				<Route path="submit" component={ SubmitPage } />
				<Route path="tags" component={ HomePage } />
				<Route path="tags/:tagName" component={ HomePage } />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);
