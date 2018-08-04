import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import styles from './Main.sass';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

class Main extends Component {
	handleChange(event) {
	  this.setState({
	    [event.target.name]: event.target.type === 'checkbox'
	      ? event.target.checked
	      : event.target.value
	  });
	}
	render() {
		return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
		);
	}
}

export default Main;
