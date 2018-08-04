import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './List.sass';

import moment from 'moment';
import { Link } from 'react-router';
import FileSaver from 'file-saver';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: ''
		};
	}
	handleChange(event) {
	  this.setState({
	    [event.target.name]: event.target.type === 'checkbox'
	      ? event.target.checked
	      : event.target.value
	  });
	}
	handleAddToCalendar(event, data) {
		event.preventDefault();
		const dates = data.dates.split(' - ');
    
    const content = [
      {
        key: 'BEGIN',
        value: 'VCALENDAR'
      },
      {
        key: 'VERSION',
        value: '2.0'
      },
      {
        key: 'BEGIN',
        value: 'VEVENT'
      },
      {
        key: 'DTSTAMP',
        value: moment().format('YYYYMMDDTHHmmssZ')
      },
      {
        key: 'STATUS',
        value: 'CONFIRMED'
      },
      {
        key: 'UID',
        value: `${data.id}arrayofconfscom`
      },
      {
        key: 'DTSTART;VALUE=DATE',
        value: moment(dates[0], 'M/D').format('YYYYMMDD')
      },
      {
        key: 'DTEND;VALUE=DATE',
        value: moment(dates[1] || dates[0], 'M/D').format('YYYYMMDD')
      },
      {
        key: 'SUMMARY',
        value: data.name
      },
      {
        key: 'DESCRIPTION',
        value: data.description || 'There is no description.'
      },
      {
        key: 'X-ALT-DESC;FMTTYPE=text/html',
        value: data.description || 'There is no description.'
      },
      {
        key: 'LOCATION',
        value: data.location
      },
      {
        key: 'BEGIN',
        value: 'VALARM'
      },
      {
        key: 'TRIGGER',
        value: '-PT15M'
      },
      {
        key: 'ACTION',
        value: 'DISPLAY'
      },
      {
        key: 'END',
        value: 'VALARM'
      },
      {
        key: 'TRANSP',
        value: 'OPAQUE'
      },
      {
        key: 'END',
        value: 'VEVENT'
      },
      {
        key: 'END',
        value: 'VCALENDAR'
      }
    ]
      .map((info) => {
        return `${info.key}:${info.value}`
      })
      .join('\n');
    
    const file = new File(
      [content],
      `${data.name}.ics`,
      {
        type: 'text/calendar'
      }
    );
    FileSaver.saveAs(file);
	}
	handleToggle(event, data) {
		event.preventDefault();
		if (data.name === this.state.open) {
      this.setState({
        open: ''
      });
      return;
    }
    this.setState({
      open: data.name
    });
	}
	render() {
		return (
      <ul className={styles.list}>
				{this.props.items.map((item) => {
					return (
						<li
							key={item.website}
							className={classNames(
								styles.item,
								this.state.open === item.name
								? styles.highlight
								: null
							)}
						>
							<div className={styles.row}>
								<div className={styles.calendar}>
									<div className={styles.month}>
										{
  moment(
    item.dates.split('/')[0],
    'M'
  )
    .format('MMM')
}
									</div>
									<div className={styles.date}>
										{
  item.dates
    .split('-')[0]
    .split('/')[1]
}
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.name}>
										<a
											href={item.website}
											rel="noopener noreferrer"
											target="_blank"
										>
											{item.name}
										</a>
									</div>
									<div className={styles.location}>
										{item.location}
									</div>
									<ul className={styles.tags}>
										{(item.tags ? item.tags.split(' ') : []).map((tag) => {
											return (
												<li
													key={tag}
													className={styles.tag}
												>
													<Link
														to={`tags/${tag}`}
														className={classNames(
															styles.tagLink,
															tag === this.props.tag
															? styles.selected
															: null
														)}
													>
														{tag}
													</Link>
												</li>
											);
										})}
									</ul>
								</div>
								<div className={styles.actions}>
									<div>
										<a
											disabled={!item.diversityScholarship}
											href={item.diversityScholarship}
											rel="noopener noreferer"
											target="_blank"
											title="Offers Diversity Scholarship Program"
										
											className={classNames(
												styles.icon,
												styles.diversity
											)}
										/>
										<a
											disabled={!item.codeOfConduct}
											href={item.codeOfConduct}
											rel="noopener noreferer"
											target="_blank"
											title="Has Code of Conduct"
										
											className={classNames(
												styles.icon,
												styles.conduct
											)}
										/>
										<a
											disabled={!item.speakerRegistration}
											href={item.speakerRegistration}
											rel="noopener noreferer"
											target="_blank"
											title="Accepting Speaker Applications"
										
											className={classNames(
												styles.icon,
												styles.speaker
											)}
										/>
										<button
											onClick={event => this.handleToggle(event, item)}
											className={styles.moreInfoButton}
										>
											More Info
										</button>
										<a
											disabled={!item.attendUrl}
											href={item.attendUrl}
											rel="noopener noreferer"
											target="_blank"
										
											className={styles.attendButton}
										>
											{item.attendUrl ? 'Attend' : 'n/a'}
										</a>
									</div>
									<div className={styles.cost}>
										{item.cost}
									</div>
								</div>
							</div>
							<div className={classNames(
								styles.moreInfo,
								this.state.open === item.name
									? styles.open
									: null
							)}>
								<div className={styles.moreInfoContent}>
									<h3>
										Description
									</h3>
									<p>
										{item.description || (<em>There is no additional information.</em>)}
									</p>
									<ul className={styles.moreInfoContentList}>
										<If condition={item.codeOfConduct}>
											<li className={styles.moreInfoContentItem}>
												<a
													href={item.codeOfConduct}
													rel="noopener noreferrer"
													target="_blank"
												
													className={styles.moreInfoContentButton}
												>
													Code of Conduct
												</a>
											</li>
										</If>
										<If condition={item.twitter}>
											<li className={styles.moreInfoContentItem}>
												<a
													href={`https://twitter.com/${item.twitter}`}
													rel="noopener noreferrer"
													target="_blank"
												
													className={styles.moreInfoContentButton}
												>
													@{item.twitter}
												</a>
											</li>
										</If>
										<If condition={item.website}>
											<li className={styles.moreInfoContentItem}>
												<a
													href={item.website}
													rel="noopener noreferrer"
													target="_blank"
												
													className={styles.moreInfoContentButton}
												>
													Visit Website
												</a>
											</li>
										</If>
										<li className={styles.moreInfoContentItem}>
											<button
												onClick={event => this.handleAddToCalendar(event, item)}
												className={styles.moreInfoContentButton}
											>
												Add to Calendar
											</button>
										</li>
									</ul>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		);
	}
}

List.defaultProps = {
	tag: ''
};

List.propTypes = {
	tag: PropTypes.string
};

export default List;
