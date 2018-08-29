import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import styles from './Heading.sass';

class Heading extends Component {
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    });
  }
  render() {
    return (
      <div className={styles.heading}>
				<h2 className={styles.title}>
					{this.props.title}
				</h2>
				<h3 className={styles.subtitle}>
					{this.props.subtitle}
				</h3>
			</div>
    );
  }
}

export default Heading;
