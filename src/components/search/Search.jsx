import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import geocodeAction from '../../actions/geocode';

import updateFilterAction from '../../actions/updateFilter';

import styles from './Search.sass';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: '',
      distance: 'any'
    };
  }
  handleFocus(event, data) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      hasFocus: true
    });
  }
  handleBlur(event, data) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      hasFocus: false
    });
  }
  handleChange(event, data) {
    const currentProps = {
      conduct: this.props.filterConduct,
      distance: this.props.filterDistance,
      diversity: this.props.filterDiversity,
      location: this.props.filterLocation,
      old: this.props.filterOld,
      order: this.props.filterOrder,
      sort: this.props.filterSort,
      speaker: this.props.filterSpeaker,
      value: this.props.filterValue
    };
    this.props.updateFilter({
      ...currentProps,
      [event.target.name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    });
  }
  handleLocation(event, data) {
    if (event) {
      event.preventDefault();
    }
    this.props.geocode({
      location: this.props.filterLocation
    });
  }
  render() {
    return (
      <Fragment>
        <div className={classNames(
					styles.search,
					this.state.hasFocus
						? styles.focus
						: null
				)}>
					<input
						name="value"
						onBlur={event => this.handleBlur(event)}
						onChange={event => this.handleChange(event)}
						onFocus={event => this.handleFocus(event)}
						placeholder="Find your next conference..."
						value={this.props.filterValue}
					
						className={styles.filter}
					/>
					<div className={styles.content}>
						<b className={styles.title}>
							Filters:
						</b>
						<div className={styles.field}>
							<label className={styles.label}>
								Distance
							</label>
							<select
								name="distance"
								onChange={event => this.handleChange(event)}
								value={this.props.filterDistance}
							>
								{['any', '5 mi', '10 mi', '25 mi', '50 mi', '100 mi'].map((option) => {
									return (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									);
								})}
							</select>
						</div>
						<If condition={this.props.filterDistance !== 'any'}>
							<div
								label={{
									children: 'Near',
									className: 'label',
									htmlFor: 'filter-location'
								}}
								className={styles.field}
							>
								<label
									htmlFor="filter-location"
									className={styles.label}
								>
									Near
								</label>
								<input
									id="filter-location"
									name="location"
									onBlur={event => this.handleLocation(event)}
									onChange={event => this.handleChange(event)}
									value={this.props.filterLocation}
								
									className={styles.input}
								/>
							</div>
						</If>
						<div className={styles.field}>
							<label className={styles.label}>
								Order
							</label>
							<select
								name="order"
								onChange={event => this.handleChange(event)}
								value={this.props.filterOrder}
							>
								{['date', 'name'].map((option) => {
									return (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									);
								})}
							</select>
						</div>
						<div className={styles.field}>
							<label className={styles.label}>
								Sort
							</label>
							<select
								name="sort"
								onChange={event => this.handleChange(event)}
								value={this.props.filterSort}
							>
								{['asc', 'desc'].map((option) => {
									return (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									);
								})}
							</select>
						</div>
						<div className={styles.field}>
							<input
								checked={this.state.diversity}
								id="filter-diversity"
								name="diversity"
								onChange={event => this.handleChange(event)}
								type="checkbox"
							
								className={styles.checkbox}
							/>
							<label
								htmlFor="filter-diversity"
								className={classNames(
									styles.checkboxLabel,
									styles.diversity,
									styles.attribute
								)}
							>
								Diversity Scholarship
							</label>
							<input
								checked={this.props.filterConduct}
								id="filter-conduct"
								name="conduct"
								onChange={event => this.handleChange(event)}
								type="checkbox"
							
								className={styles.checkbox}
							/>
							<label
								htmlFor="filter-conduct"
								className={classNames(
									styles.checkboxLabel,
									styles.conduct,
									styles.attribute
								)}
							>
								Code of Conduct
							</label>
							<input
								checked={this.props.filterSpeaker}
								id="filter-speaker"
								name="speaker"
								onChange={event => this.handleChange(event)}
								type="checkbox"
							
								className={styles.checkbox}
							/>
							<label
								htmlFor="filter-speaker"
								className={classNames(
									styles.checkboxLabel,
									styles.speaker,
									styles.attribute
								)}
							>
								Needs Speakers
							</label>
							<input
								checked={this.props.filterOld}
								id="filter-past"
								name="past"
								onChange={event => this.handleChange(event)}
								type="checkbox"
							
								className={styles.checkbox}
							/>
							<label
								htmlFor="filter-past"
								className={classNames(
									styles.checkboxLabel,
									styles.old,
									styles.attribute
								)}
							>
								Past Confs
							</label>
						</div>
					</div>
				</div>
      </Fragment>
    );
  }
}

Search.defaultProps = {
  filterConduct: false,
  filterDistance: '',
  filterDiversity: false,
  filterLocation: '',
  filterPast: false,
  filterOrder: '',
  filterSort: '',
  filterSpeaker: false,
  filterValue: '',
  geocode: () => {},
  updateFilter: () => {}
};

Search.propTypes = {
  filterConduct: PropTypes.bool,
  filterDistance: PropTypes.string,
  filterDiversity: PropTypes.bool,
  filterLocation: PropTypes.string,
  filterPast: PropTypes.bool,
  filterOrder: PropTypes.string,
  filterSort: PropTypes.string,
  filterSpeaker: PropTypes.bool,
  filterValue: PropTypes.string,
  geocode: PropTypes.func,
  updateFilter: PropTypes.func
};

function mapStateToProps(state) {
  return {
    filterConduct: state.filter.conduct,
    filterDistance: state.filter.distance,
    filterDiversity: state.filter.diversity,
    filterLocation: state.filter.location,
    filterPast: state.filter.past,
    filterOrder: state.filter.order,
    filterSort: state.filter.sort,
    filterSpeaker: state.filter.speaker,
    filterValue: state.filter.value
  };
}

function mapDispatchToProps(dispatch) {
  return {
    geocode: (...args) => {
      dispatch(
        geocodeAction(...args)
      );
    },
    updateFilter: (...args) => {
      dispatch(
        updateFilterAction(...args)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
