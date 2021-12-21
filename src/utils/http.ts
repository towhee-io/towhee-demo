import axios from 'axios';

export const DEMOS_BASE_URL = process.env.BASE_API_URL;
console.log(DEMOS_BASE_URL)

export const axiosInstance = axios.create({
  baseURL: 'https://demos.zilliz.com',
  timeout: 300000,
});

export const search = async (
  formData: FormData,
  isCn: boolean
): Promise<any> => {
  const url = `${isCn ? 'cn' : 'en'}_img_serh/api/v1/search`;
  const res = await axiosInstance.post(url, formData);
  return res.data;
};

export const getCount = async (isCn: boolean): Promise<number> => {
  const url = `${isCn ? 'cn' : 'en'}_img_serh/api/v1/count`;
  const res = await axiosInstance.post(url);
  return res.data;
};
