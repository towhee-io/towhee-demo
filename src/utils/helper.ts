import { ImageSearchDemoListType } from '../types/Demos';

type Base64ImageType = {
  dataURL: string;
  type: string;
};


export const getImgUrl: (param: File | Blob) => string = file => {
  let url: string = '';
  if (URL.createObjectURL) {
    // basic
    url = URL.createObjectURL(file);
  } else if (window.URL) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};

export const convertBase64UrlToBlob: (param: Base64ImageType) => Blob =
  base64 => {
    var urlData = base64.dataURL;
    var type = base64.type;
    var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: type });
  };
/*
 * 图片的绝对路径地址 转换成base64编码 如下代码：
 */

export const getBase64Image: (params: HTMLImageElement) => Base64ImageType =
  img => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const ext: string = img.src
      .substring(img.src.lastIndexOf('.') + 1)
      .toLowerCase();
    const dataURL: string = canvas.toDataURL('image/' + ext);
    return {
      dataURL: dataURL,
      type: 'image/' + ext,
    };
  };

export const formatCount = (count: number) => {
  const tempArr = count.toString();
  let [len, res] = [tempArr.length, []];

  while (len > 3) {
    res.push(tempArr.substr(len - 3, 3));
    len -= 3;
  }
  res.push(tempArr.substr(0, len));
  return res.reverse().join(',');
};


export const formatImgData = async (
    list: ImageSearchDemoListType,
    setFunc: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const results = list.map(item => {
      const distance = item[1] ? item[1].toFixed(6) : 0;
      const src = item[0][0];
      const origin_src = src.replace(/pc_suo_|mobile_suo_/g, '');
      const [width, height] = item[0][1].split('X');
      return {
        distance,
        src,
        width: Number(width),
        height: Number(height),
        origin_src,
      };
    });
    setFunc(v => [...v, ...results]);
  };
