import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import loadConferencesAction from '../../actions/loadConferences';

import styles from './Home.sass';

import List from '../../components/list/List';
import Search from '../../components/search/Search';
import moment from 'moment';
import Featured from '../../components/featured/Featured';
import haversine from 'haversine';

class HomePage extends Component {
  componentDidMount() {
    this.props.loadConferences();
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
      <Fragment>
        <div className={styles.home}>
          <Featured />
          <Search />
          <List
            tag={this.props.match.params.tagName}
            items={
              this.props.items
                .filter(item => {
                  if (this.props.filterPast) {
                    return true;
                  }
                  const aDate = moment(item.dates.split(' ')[0], 'YYYY/MM/DD');
                  const bDate = moment();
                  return aDate > bDate;
                })
                .map(item => {
                  if (this.props.filterPast) {
                    const aDate = moment(item.dates.split(' ')[0], 'YYYY/MM/DD');
                    const bDate = moment();
                    if (aDate < bDate) {
                      return {
                        ...item,
                        isPast: true
                      };
                    }
                  }
                  return item;
                })
                .filter(item => {
                  if (
                    this.props.filterDistance !== 'any'
                    &&
                    this.props.filterLocation
                    &&
                    this.props.latitude !== -1
                    &&
                    this.props.longitude !== -1
                    &&
                    haversine(
                      {
                        latitude: this.props.latitude,
                        longitude: this.props.longitude
                      },
                      {
                        latitude: item.latitude,
                        longitude: item.longitude
                      },
                      {
                        unit: 'mile'
                      }
                    ) > parseInt(this.props.filterDistance, 10)
                  ) {
                    return false;
                  }
                  if (
                    (this.props.filterDiversity && !item.diversityScholarship)
                    ||
                    (this.props.filterConduct && !item.codeOfConduct)
                    ||
                    (this.props.filterSpeaker && !item.speakerRegistration)
                  ) {
                    return false;
                  }
                  if (
                    this.props.match.params
                      && this.props.match.params.tagName
                      && !item.tags.split(' ').includes(this.props.match.params.tagName)
                  ) {
                    return false;
                  }
                  return !this.props.filterValue
                    || new RegExp(this.props.filterValue, 'i').test(item.name)
                    || new RegExp(this.props.filterValue, 'i').test(item.tags);
                })
                .sort((a, b) => {
                  if (this.props.filterOrder === 'name') {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    if (this.props.filterSort === 'desc') {
                      if (aName > bName) {
                        return -1;
                      } else if (aName < bName) {
                        return 1;
                      }
                    }
                    if (aName < bName) {
                      return -1;
                    } else if (aName > bName) {
                      return 1;
                    }
                    return 0;
                  }
                  const aDate = moment(a.dates.split(' ')[0], 'YYYY/MM/DD');
                  const bDate = moment(b.dates.split(' ')[0], 'YYYY/MM/DD');
                  if (this.props.filterSort === 'desc') {
                    if (aDate > bDate) {
                      return -1;
                    } else if (aDate < bDate) {
                      return 1;
                    }
                  }
                  if (aDate < bDate) {
                    return -1;
                  } else if (aDate > bDate) {
                    return 1;
                  }
                  return 0;
                })
              }
          />
        </div>
      </Fragment>
    );
  }
}

HomePage.defaultProps = {
  items: [],
  loadConferences: () => {},
  filterValue: '',
  filterSort: '',
  filterDiversity: false,
  filterConduct: false,
  filterSpeaker: false,
  latitude: -1,
  longitude: -1,
  filterDistance: '',
  filterLocation: '',
  filterOrder: '',
  filterPast: false
};

HomePage.propTypes = {
  items: PropTypes.array,
  loadConferences: PropTypes.func,
  filterValue: PropTypes.string,
  filterSort: PropTypes.string,
  filterDiversity: PropTypes.bool,
  filterConduct: PropTypes.bool,
  filterSpeaker: PropTypes.bool,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  filterDistance: PropTypes.string,
  filterLocation: PropTypes.string,
  filterOrder: PropTypes.string,
  filterPast: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    items: state.conferences.items,
    filterValue: state.filter.value,
    filterSort: state.filter.sort,
    filterDiversity: state.filter.diversity,
    filterConduct: state.filter.conduct,
    filterSpeaker: state.filter.speaker,
    latitude: state.geocode.latitude,
    longitude: state.geocode.longitude,
    filterDistance: state.filter.distance,
    filterLocation: state.filter.location,
    filterOrder: state.filter.order,
    filterPast: state.filter.past
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadConferences: (...args) => {
      dispatch(
        loadConferencesAction(...args)
      );
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
