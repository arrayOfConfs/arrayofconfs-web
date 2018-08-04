import ClientAPI from '../../src/apis/client';

export default function loadConferences() {
  return async (dispatch) => {
    const response = await ClientAPI.getConferences();
    
    dispatch({
      type: 'LOAD_CONFERENCES_RES',
      data: {
        conferences: response.data.conferences
      }
    });
  };
}
