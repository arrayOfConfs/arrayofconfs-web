import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import thunk from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { render } from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch, withRouter } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';

// pages
import AboutPage from './pages/about/About';
import ContactPage from './pages/contact/Contact';
import HomePage from './pages/home/Home';
import SubmitPage from './pages/submit/Submit';

// reducers
import conferencesReducer from './reducers/conferences';
import filterReducer from './reducers/filter';
import submitReducer from './reducers/submit';
import geocodeReducer from './reducers/geocode';

// templates
import MainTemplate from './templates/main/Main';

import './App.sass';

const history = createBrowserHistory({ basename: '/' });
const router = routerMiddleware(history);

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

class ScrollToTopComponent extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTop = withRouter(ScrollToTopComponent);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} onUpdate={() => { window.scrollTo(100, 100); window.scrollTo(0, 0); }}>
          <ScrollToTop>
            <Helmet
              titleTemplate="%s | arrayOfConfs"
            />
            <MainTemplate>
              <Switch>
                <Route path="/" component={ HomePage } exact />
                <Route path="about" component={ AboutPage } />
                <Route path="contact" component={ ContactPage } />
                <Route path="submit" component={ SubmitPage } />
                <Route path="tags" component={ HomePage } />
                <Route path="tags/:tagName" component={ HomePage } />
              </Switch>
            </MainTemplate>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
