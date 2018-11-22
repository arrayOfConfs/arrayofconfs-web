export default function updateFilter({
  conduct = false,
  distance = '',
  diversity = false,
  location = '',
  order = 'date',
  past = false,
  sort = 'asc',
  speaker = false,
  value = ''
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
        past,
        sort,
        speaker,
        value
      }
    });
  };
}
