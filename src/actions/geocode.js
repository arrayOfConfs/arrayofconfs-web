import axios from 'axios';

export default function geocode({
	location = ''
} = {}) {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_GEOCODE'
    });
    
    if (!location) {
      return;
    }
    
    const key = 'AIzaSyD991-A9-s6bIIyvBGuRwvSYxkNaG7pc_8';
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
      .then((result) => {
        if (!result || !result.data || !result.data.results || !result.data.results.length) {
          dispatch({
            type: 'CLEAR_GEOCODE'
          });
          return;
        }
        dispatch({
          type: 'GEOCODE',
          latitude: result.data.results[0].geometry.location.lat,
          longitude: result.data.results[0].geometry.location.lng
        });
      });
  };
}
