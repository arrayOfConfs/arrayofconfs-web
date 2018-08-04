const initialState = {
  latitude: -1,
  longitude: -1
};

export default function geocodeReducer(state = initialState, action = {}) {
	switch (action.type) {
		case 'CLEAR_GEOCODE': {
		  return initialState;
		}
		case 'GEOCODE': {
		  return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      };
		}
		default: {
			return state;
		}
	}
}
