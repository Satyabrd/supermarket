import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/checkout/', // your Django URL
});

export default api;
