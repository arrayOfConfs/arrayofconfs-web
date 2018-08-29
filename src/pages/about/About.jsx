import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import styles from './About.sass';

class About extends Component {
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    });
  }
  render() {
    return (
      <div className={styles.about}>
				<div className={styles.content}>
					<h1>
						About arrayOfConfs
					</h1>
					<p>
						Test test test...
					</p>
				</div>
			</div>
    );
  }
}

export default About;
