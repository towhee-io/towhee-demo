import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
  useContext,
} from 'react';
import { rootContext } from '../../../context/Root';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  cropper: () => ({
    width: '247px',
    height: 'auto',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

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

const CroppeDemo = (props: any) => {
  const { cropAndSearch, model } = props;
  const classes = useStyles();
  const cropperRef = useRef<any>(null);
  const { fileSrc } = useContext(rootContext);

  let onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const model: any = imageElement?.model;

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!cropper?.getCroppedCanvas()) {
        return;
      }
      cropper.getCroppedCanvas().toBlob(
        blob => {
          cropAndSearch(blob, model, true, null);
        } /*, 'image/png' */
      );
    }, 1000);
  };

  useEffect(() => {
    cropperRef.current.model = model;
  }, [model]);

  return useMemo(
    () => (
      <div className={classes.cropper}>
        <Cropper
          key={`${model}${fileSrc.src}`}
          src={fileSrc.src}
          style={{ height: 'auto', width: '100%' }}
          // Cropper.js options
          autoCropArea={1}
          guides={true}
          crop={onCrop}
          ref={cropperRef}
        />
      </div>
    ),
    [cropAndSearch, model]
  );
};
export default CroppeDemo;
