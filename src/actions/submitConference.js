import ClientAPI from '../../src/apis/client';

export default function submitConference({
  authorEmail = '',
  authorName = '',
  conduct = '',
  description = '',
  diversity = '',
  facebook = '',
  fromDate = '',
  github = '',
  location = '',
  name = '',
  tags = '',
  toDate = '',
  twitter = '',
  website = ''
} = {}) {
  return async (dispatch) => {
    dispatch({
      type: 'SUBMIT_CONFERENCE_REQ'
    });
    
    const response = await ClientAPI.postConferences({
      body: {
        authorEmail,
        authorName,
        conduct,
        dates: `${fromDate}${toDate ? ` - ${toDate}` : ''}`,
        description,
        diversity,
        facebook,
        github,
        location,
        name,
        tags,
        twitter,
        website
      }
    });
    
    dispatch({
      type: 'SUBMIT_CONFERENCE_RES'
    });
  };
}
