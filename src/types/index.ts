export type UploaderHeaderType = {
  searchImg: (params: {
    file: File;
    reset: boolean;
    scrollPage: number | null;
    isSelected: boolean;
  }) => void;
  handleSelectedImg: (file: File, src: string) => void;
  toggleIsShowCode: () => void;
  selectedImg: string;
  count: string;
  duration: number | string;
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
