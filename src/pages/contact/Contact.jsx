import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import styles from './Contact.sass';

class ContactPage extends Component {
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    });
  }
  render() {
    return (
      <Fragment>
        <div className={styles.contact}>
					<div className={styles.content}>
						<h1>
							Contact Us
						</h1>
						<p>
							Test test test...
						</p>
					</div>
				</div>
      </Fragment>
    );
  }
}

export default ContactPage;
