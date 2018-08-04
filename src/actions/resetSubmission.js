export default function resetSubmission() {
  return async (dispatch) => {
    dispatch({
      type: 'RESET_SUBMISSION'
    });
  };
}
