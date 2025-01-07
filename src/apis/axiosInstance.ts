import axios from 'axios';

const TEAM_ID = '6-5';
const BASE_URL = `https://fe-adv-project-together-dallaem.vercel.app/${TEAM_ID}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

export default axiosInstance;
