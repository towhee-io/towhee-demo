export type ImgsList = {
  height: number;
  width: number;
  src: string;
  distance: number;
}[];

export interface IRegisterInfo {
  company?: string;
  country_code?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  phone?: string;
  wants_information_emails: boolean;
}
export interface IUserInfo {
  info: string;
  type: 'email' | 'uid';
}

export interface ILoginInfo {
  email: string;
  password: string;
  phone?: string;
}

export type ImageSearchDemoListType = [[string, string], number][];
