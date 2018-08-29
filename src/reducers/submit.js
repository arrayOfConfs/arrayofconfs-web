const initialState = {
  isComplete: false,
  isLoading: false
};

export default function submitReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SUBMIT_CONFERENCE_REQ': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'SUBMIT_CONFERENCE_RES': {
      return {
        ...state,
        isComplete: true,
        isLoading: false
      };
    }
    case 'RESET_SUBMISSION': {
      return {
        ...state,
        isComplete: false,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
}
