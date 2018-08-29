import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import submitConferenceAction from '../../actions/submitConference';

import styles from './Submit.sass';

import Heading from '../../components/heading/Heading';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conduct: 'https://',
      description: '',
      diversity: 'https://',
      facebook: '',
      fromDate: '',
      github: '',
      isComplete: false,
      location: '',
      multiDate: false,
      name: '',
      tags: '',
      toDate: '',
      twitter: '',
      website: 'https://',
      authorEmail: '',
      authorName: ''
    };
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    });
  }
  handleSubmit(event, data) {
    event.preventDefault();
    this.props.submitConference(this.state);
  }
  render() {
    return (
      <div>
				<Heading
					title="Add a Conf"
					subtitle="Submit a conference to our database"
				/>
				<If condition={this.props.isComplete}>
					<div className={styles.complete}>
						Thank you for your submission!
					</div>
				</If>
				<form
					onSubmit={event => this.handleSubmit(event)}
					className={styles.form}
				>
					<h3 className={styles.title}>
						Your Info
					</h3>
					<div
						label={{
							'children': 'Your Name',
							className: 'label',
							htmlFor: 'yourName'
						}}
						className={styles.field}
					>
						<label
							htmlFor="yourName"
							className={styles.label}
						>
							Your Name
						</label>
						<input
							autoFocus
							disabled={this.props.isComplete}
							name="authorName"
							onChange={event => this.handleChange(event)}
							value={this.state.authorName}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Your Email',
							className: 'label',
							htmlFor: 'yourName'
						}}
						className={styles.field}
					>
						<label
							htmlFor="yourName"
							className={styles.label}
						>
							Your Email
						</label>
						<input
							disabled={this.props.isComplete}
							name="authorEmail"
							onChange={event => this.handleChange(event)}
							value={this.state.authorEmail}
						
							className={styles.value}
						/>
					</div>
					<h3 className={styles.title}>
						Conf Info
					</h3>
					<div
						label={{
							'children': 'Name',
							className: 'label',
							htmlFor: 'name'
						}}
						className={styles.field}
					>
						<label
							htmlFor="name"
							className={styles.label}
						>
							Name
						</label>
						<input
							disabled={this.props.isComplete}
							name="name"
							onChange={event => this.handleChange(event)}
							value={this.state.name}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Location',
							className: 'label',
							htmlFor: 'location'
						}}
						className={styles.field}
					>
						<label
							htmlFor="location"
							className={styles.label}
						>
							Location
						</label>
						<input
							disabled={this.props.isComplete}
							name="location"
							onChange={event => this.handleChange(event)}
							value={this.state.location}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Description',
							className: 'label',
							htmlFor: 'description'
						}}
						className={styles.field}
					>
						<label
							htmlFor="description"
							className={styles.label}
						>
							Description
						</label>
						<input
							disabled={this.props.isComplete}
							name="description"
							onChange={event => this.handleChange(event)}
							value={this.state.description}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Tags',
							className: 'label',
							htmlFor: 'tags'
						}}
						className={styles.field}
					>
						<label
							htmlFor="tags"
							className={styles.label}
						>
							Tags
						</label>
						<input
							disabled={this.props.isComplete}
							name="tags"
							onChange={event => this.handleChange(event)}
							placeholder="(Example: javascript devops womenintech)"
							value={this.state.tags}
						
							className={styles.value}
						/>
					</div>
					<h3 className={styles.title}>
						Date Info
					</h3>
					<div
						label={{
							'children': 'From Date',
							className: 'label',
							htmlFor: 'fromDate'
						}}
						className={styles.field}
					>
						<label
							htmlFor="fromDate"
							className={styles.label}
						>
							From Date
						</label>
						<input
							disabled={this.props.isComplete}
							name="fromDate"
							onChange={event => this.handleChange(event)}
							value={this.state.fromDate}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Multiple Dates?',
							className: 'label',
							htmlFor: 'multiDate'
						}}
						className={styles.field}
					>
						<label
							htmlFor="multiDate"
							className={styles.label}
						>
							Multiple Dates?
						</label>
						<input
							checked={this.state.multiDate}
							disabled={this.props.isComplete}
							name="multiDate"
							onChange={event => this.handleChange(event)}
							type="checkbox"
						
							className={styles.value}
						/>
					</div>
					<If condition={this.state.multiDate}>
						<div
							label={{
								'children': 'To Date',
								className: 'label',
								htmlFor: 'toDate'
							}}
							className={styles.field}
						>
							<label
								htmlFor="toDate"
								className={styles.label}
							>
								To Date
							</label>
							<input
								disabled={this.props.isComplete}
								name="toDate"
								onChange={event => this.handleChange(event)}
								value={this.state.toDate}
							
								className={styles.value}
							/>
						</div>
					</If>
					<h3 className={styles.title}>
						Links
					</h3>
					<div
						label={{
							'children': 'Website',
							className: 'label',
							htmlFor: 'website'
						}}
						className={styles.field}
					>
						<label
							htmlFor="website"
							className={styles.label}
						>
							Website
						</label>
						<input
							disabled={this.props.isComplete}
							name="website"
							onChange={event => this.handleChange(event)}
							value={this.state.website}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Code of Conduct',
							className: 'label',
							htmlFor: 'website'
						}}
						className={styles.field}
					>
						<label
							htmlFor="website"
							className={styles.label}
						>
							Code of Conduct
						</label>
						<input
							disabled={this.props.isComplete}
							name="conduct"
							onChange={event => this.handleChange(event)}
							value={this.state.conduct}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Diversity Scholarship',
							className: 'label',
							htmlFor: 'diversity'
						}}
						className={styles.field}
					>
						<label
							htmlFor="diversity"
							className={styles.label}
						>
							Diversity Scholarship
						</label>
						<input
							disabled={this.props.isComplete}
							name="diversity"
							onChange={event => this.handleChange(event)}
							value={this.state.diversity}
						
							className={styles.value}
						/>
					</div>
					<h3 className={styles.title}>
						Social
					</h3>
					<div
						label={{
							'children': 'Facebook',
							className: 'label',
							htmlFor: 'facebook'
						}}
						className={styles.field}
					>
						<label
							htmlFor="facebook"
							className={styles.label}
						>
							Facebook
						</label>
						<input
							disabled={this.props.isComplete}
							name="facebook"
							onChange={event => this.handleChange(event)}
							value={this.state.facebook}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'Twitter',
							className: 'label',
							htmlFor: 'twitter'
						}}
						className={styles.field}
					>
						<label
							htmlFor="twitter"
							className={styles.label}
						>
							Twitter
						</label>
						<input
							disabled={this.props.isComplete}
							name="twitter"
							onChange={event => this.handleChange(event)}
							value={this.state.twitter}
						
							className={styles.value}
						/>
					</div>
					<div
						label={{
							'children': 'GitHub',
							className: 'label',
							htmlFor: 'github'
						}}
						className={styles.field}
					>
						<label
							htmlFor="github"
							className={styles.label}
						>
							GitHub
						</label>
						<input
							disabled={this.props.isComplete}
							name="github"
							onChange={event => this.handleChange(event)}
							value={this.state.github}
						
							className={styles.value}
						/>
					</div>
					<div className={styles.actions}>
						<button
							disabled={this.props.isLoading || this.props.isComplete}
							className={styles.button}
						>
							{this.props.isLoading ? 'Loading...' : 'Submit Conf'}
						</button>
					</div>
				</form>
			</div>
    );
  }
}

Submit.defaultProps = {
  submitConference: () => {},
  isLoading: false,
  isComplete: false
};

Submit.propTypes = {
  submitConference: PropTypes.func,
  isLoading: PropTypes.bool,
  isComplete: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isLoading: state.submit.isLoading,
    isComplete: state.submit.isComplete
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitConference: (...args) => {
      dispatch(
        submitConferenceAction(...args)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
