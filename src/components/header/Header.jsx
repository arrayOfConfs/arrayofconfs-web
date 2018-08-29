import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import styles from './Header.sass';

import { Link } from 'react-router';

class Header extends Component {
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    });
  }
  handleSubmit(event, data) {
    event.preventDefault();
    
  }
  render() {
    return (
      <header className={styles.header}>
				<div className={styles.headerContent}>
					<Link
						to="/"
						className={styles.title}
					>
						<div className={styles.mainTitle}>
							conf[]
						</div>
						<div className={styles.logo} />
						<div className={styles.subTitle}>
							arrayOfConfs
						</div>
					</Link>
					<div className={styles.right}>
						<Link
							to="/"
							className={classNames(
								styles.navItem
							)}
						>
							Home
						</Link>
						<Link
							to="about"
							className={classNames(
								styles.navItem
							)}
						>
							About
						</Link>
						<Link
							to="contact"
							className={classNames(
								styles.navItem
							)}
						>
							Contact
						</Link>
						<a
							href="https://twitter.com/arrayOfConfs"
							target="_blank"
							rel="noopener noreferer"
						
							className={styles.twitter}
						/>
						<Link
							to="submit"
							className={classNames(
								styles.button,
								styles.submit
							)}
						>
							Add a Conf
						</Link>
					</div>
				</div>
			</header>
    );
  }
}

export default Header;
