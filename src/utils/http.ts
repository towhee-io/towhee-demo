import axios from 'axios';
import { SearchPrams } from '../types';
import qs from 'qs';

export const DEMOS_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const axiosInstance = axios.create({
  baseURL: DEMOS_BASE_URL,
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

export const getModelOptions = async () => {
  const res = await axiosInstance.get('/model');
  return res.data;
};

export const getOriginImage = async (
  table_name: string,
  image_name: string
) => {
  const params = qs.stringify({ table_name, image_name });
  const url = `/raw?${params}`;
  const res = await axiosInstance.get(url);
  return res.data;
};
