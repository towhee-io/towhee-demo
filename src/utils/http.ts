import axios from 'axios';
import { SearchPrams } from '../types';
import qs from 'qs';

export const DEMOS_BASE_URL = process.env.BASE_API_URL;
console.log('DEMOS_BASE_URL--', DEMOS_BASE_URL);

export const axiosInstance = axios.create({
  baseURL: 'http://172.16.20.41:5000/',
  timeout: 300000,
});

export const search = async (
  formData: FormData,
  params: SearchPrams
): Promise<any> => {
  const queryParams = qs.stringify(params);
  const url = `/search?${queryParams}`;
  const res = await axiosInstance.post(url, formData);
  return res.data;
};

export const getCount = async (tableName: string): Promise<number> => {
  const url = `/count?table_name=${tableName}`;
  const res = await axiosInstance.post(url);
  return res.data;
};
