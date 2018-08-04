const initialState = {
  items: []
};

export default function conferencesReducer(state = initialState, action = {}) {
	switch (action.type) {
		case 'LOAD_CONFERENCES_RES': {
		  return {
        ...state,
        items: action.data.conferences
      };
		}
		default: {
			return state;
		}
	}
}
