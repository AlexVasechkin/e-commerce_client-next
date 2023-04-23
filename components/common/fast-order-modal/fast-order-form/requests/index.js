import axios from 'axios';


export default function createFastOrder(payload) {
  return axios.post(`/api/fast-order`, payload)
};
