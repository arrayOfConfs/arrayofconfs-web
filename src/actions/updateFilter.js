export default function updateFilter({
  conduct = false,
  diversity = false,
  order = 'date',
  sort = 'asc',
  speaker = false,
  value = '',
  distance = '',
  location = ''
} = {}) {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_FILTER',
      data: {
        conduct,
        distance,
        diversity,
        location,
        order,
        sort,
        speaker,
        value
      }
    });
  };
}
