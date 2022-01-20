export type UploaderHeaderType = {
  searchImg: (
    file: File,
    model: string,
    reset?: boolean,
    scrollPage?: number | null
  ) => void;
  handleSelectedImg: (file: File) => void;
  toggleIsShowCode: () => void;
  selectedImg: {
    src: string;
    isSelected: boolean;
  };
  count: string;
  duration: number | string;
  modelOptions: any;
  model: any;
  setModel: any;
};

export interface SearchPrams {
  table_name: string;
  device: DeviceType;
  page: number;
  num: number;
}

export type DeviceType = 'mobile' | 'pc';

export enum ModelType {
  'resnet50',
  'resnet101',
  'efficientnetb5',
  'efficientnetb7',
  'swinbase',
  'swinlarge',
  'vitlarge',
}
