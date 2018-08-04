import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import styles from './Footer.sass';

class Footer extends Component {
	handleChange(event) {
	  this.setState({
	    [event.target.name]: event.target.type === 'checkbox'
	      ? event.target.checked
	      : event.target.value
	  });
	}
	render() {
		return (
      <footer className={styles.footer}>
				<div className={styles.zapp}>
					Generated with ♥️ by <a className={styles.link} href="https://editor.zappjs.com/arrayofconfs/web" rel="noopener noreferer" target="_blank">⚡️ZappJS</a>
				</div>
				<div className={styles.copyright}>
					&copy; 2018 arrayOfConfs
				</div>
			</footer>
		);
	}
}

export default Footer;
