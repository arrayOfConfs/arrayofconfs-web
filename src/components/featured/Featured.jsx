import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import styles from './Featured.sass';

class Featured extends Component {
	constructor(props) {
		super(props);
		this.state = {
			featuredConfs: [
		{
			'name': 'AWS re:Invent',
			'dates': 'Nov 26 - 30',
			'location': 'Las Vegas, NV',
			'url': 'https://reinvent.awsevents.com',
			'image': 'https://s3.amazonaws.com/arrayofconfs-prod-static/aws-reinvent.jpg'
		},
		{
			'name': 'GitHub Universe',
			'dates': 'Oct 16 - 17',
			'location': 'San Francisco, CA',
			'url': 'https://githubuniverse.com',
			'image': 'https://s3.amazonaws.com/arrayofconfs-prod-static/github-universe.jpg'
		},
		{
			'name': 'DeveloperWeek Austin',
			'dates': 'Nov 6 - 8',
			'location': 'Austin, TX',
			'url': 'http://www.developerweek.com/Austin',
			'image': 'https://s3.amazonaws.com/arrayofconfs-prod-static/developerweek-austin.jpg'
		}
	],
			selectedConfIndex: -1
		};
	}
	componentDidMount() {
	  this.setState({
      selectedConfIndex: 0
    });
    setInterval(() => {
      const newIndex = this.state.selectedConfIndex === this.state.featuredConfs.length - 1
          ? 0
          : this.state.selectedConfIndex + 1;
      this.setState({
        selectedConfIndex: newIndex
      });
    }, 5000);
	}
	handleChange(event) {
	  this.setState({
	    [event.target.name]: event.target.type === 'checkbox'
	      ? event.target.checked
	      : event.target.value
	  });
	}
	render() {
		return (
      <div className={styles.featured}>
				{this.state.featuredConfs.map((conf, confIndex) => {
					return (
						<div
							key={`conf-${confIndex}`}
							style={{
								backgroundImage: `url(${conf.image})`
							}}
						
							className={classNames(
								styles.conf,
								confIndex === this.state.selectedConfIndex
								? styles.selected
								: null
							)}
						>
							<div className={styles.details}>
								<a
									href={conf.url}
									rel="noopener noreferer"
									target="_blank"
								
									className={styles.name}
								>
									{conf.name}
								</a>
								<div className={styles.city}>
									{conf.dates} // {conf.location}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Featured;
