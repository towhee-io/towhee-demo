import React, { useEffect, useRef, useMemo, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useCheckIsMobile } from '../../../hooks/Style';

const useStyles = makeStyles((theme: Theme) => ({
  cropper: () => ({
    width: '247px',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&>img': {
      width: '100%',
      height: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      width: '306px',
    },

    '& .cropper-line': {
      backgroundColor: ' #fff',
    },

    '& .cropper-view-box': {
      outline: '1px solid #fff',
      outlineColor: 'rgba(255, 255, 255, 0.75)',
    },

    '& .cropper-point': {
      width: '16px',
      height: '16px',
      border: '4px solid rgba(255, 255, 255, 1)',
      zIndex: -1,
      background: 'none',
    },
  }),
}));

let timer: ReturnType<typeof setTimeout> = null;
const CroppeDemo = props => {
  const { propSend, src, className, imgClassName, model, setFile } = props;

  const classes = useStyles();
  const imgRef = useRef(null);
  const myCropper = useRef(null);
  const [ratio, setRatio] = useState({
    width: 0,
    height: 0,
  });
  const isMobile = useCheckIsMobile();

  const handleImgLoaded = () => {
    let latestSrc = null;
    const width = imgRef.current.width;
    const height = imgRef.current.height;
    setRatio({
      width: width,
      height: isMobile ? (306 / width) * height : (247 / width) * height,
    });
    const cropper = new Cropper(imgRef.current, {
      viewMode: 3,
      autoCropArea: 0.98,
      aspectRatio: width / height,
      crop() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          handleSend(latestSrc);
          latestSrc = src;
        }, 1000);
      },
    });
    myCropper.current = cropper;
  };

  // update cropper img
  useEffect(() => {
    if (src && myCropper.current) {
      myCropper.current.destroy();
      myCropper.current.crop();
    }
  }, [src]);

  const handleSend = (latestSrc: string) => {
    const cropperInstance = myCropper.current;
    if (latestSrc !== src) {
      return;
    }
    cropperInstance.getCroppedCanvas().toBlob(
      blob => {
        propSend(blob, model, true, null);
        setFile(blob);
      } /*, 'image/png' */
    );
  };

  return (
    <div className={classes.cropper}>
      <div
        className={className}
        style={{ width: `${ratio.width}px`, height: `${ratio.height}px` }}
      >
        {src && (
          <img
            ref={imgRef}
            src={src}
            alt="test"
            className={imgClassName}
            draggable={false}
            onLoad={handleImgLoaded}
          ></img>
        )}

        {/* <button onClick={handleDownload}>download</button>
      <button onClick={handleSend}>send</button> */}
      </div>
    </div>
  );
};
export default CroppeDemo;
