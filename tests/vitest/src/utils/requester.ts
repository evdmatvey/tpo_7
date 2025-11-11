import { BmcConfig } from '../config/bmc.config.js';
import axios, { CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: `https://${BmcConfig.ip}:${BmcConfig.port}/`,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: BmcConfig.credentials.login,
    password: BmcConfig.credentials.password,
  },

  withCredentials: true,
};

export const requester = axios.create(options);
