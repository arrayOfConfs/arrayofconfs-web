import axios from 'axios';

const ClientAPI = {
  getConferences: ({ params, body, query } = {}) => {
    return axios({
      method: 'get',
      params: query,
      url: `${CONFIG.api.origin}/conferences`,
      data: body
    });
  },
  postConferences: ({ params, body, query } = {}) => {
    return axios({
      method: 'post',
      params: query,
      url: `${CONFIG.api.origin}/conferences`,
      data: body
    });
  },
  deleteConferencesConferenceId: ({ params, body, query } = {}) => {
    return axios({
      method: 'delete',
      params: query,
      url: `${CONFIG.api.origin}/conferences/${params.conferenceId}`,
      data: body
    });
  },
  patchConferencesConferenceId: ({ params, body, query } = {}) => {
    return axios({
      method: 'patch',
      params: query,
      url: `${CONFIG.api.origin}/conferences/${params.conferenceId}`,
      data: body
    });
  },
};

export default ClientAPI;
