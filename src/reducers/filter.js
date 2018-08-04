const initialState = {
  conduct: false,
  distance: 'any',
  diversity: false,
  location: '',
  order: 'date',
  sort: 'asc',
  speaker: false,
  value: ''
};

export default function filterReducer(state = initialState, action = {}) {
	switch (action.type) {
		case 'UPDATE_FILTER': {
		  return {
        ...state,
        conduct: action.data.conduct,
        distance: action.data.distance,
        diversity: action.data.diversity,
        location: action.data.location,
        order: action.data.order,
        sort: action.data.sort,
        speaker: action.data.speaker,
        value: action.data.value
      };
		}
		default: {
			return state;
		}
	}
}
