import axios from 'axios';

export const wakaFetchInit = key => axios.create({
  baseURL: 'https://wakatime.com/api/v1/',
  timeout: 1000,
  headers: {
    Authorization: `Basic ${key}`,
  },
});

export const jiraFetchInit = () => axios.create({
  baseURL: 'https://wakatime.com/api/v1/',
  timeout: 1000,
  headers: {
    Authorization: 'Basic MTIzNDU=',
  },
});
