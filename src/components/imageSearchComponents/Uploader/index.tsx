import React, { useRef } from 'react';
import {
  Button,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Link,
} from '@material-ui/core';
import { getImgUrl } from '../../../utils/helper';
import { FileDrop } from 'react-file-drop';
import Cropper from '../Cropper';
import { useCheckIsMobile } from '../../../hooks/Style';
import { useStyles } from './style';
import { UploaderHeaderType } from '../../../types';

const UploaderHeader: React.FC<UploaderHeaderType> = ({
  searchImg,
  handleSelectedImg,
  toggleIsShowCode,
  selectedImg,
  count,
  duration,
  modelOptions,
  model,
  setModel,
}) => {
  const classes = useStyles({ selectedImg });
  const isMobile = useCheckIsMobile();
  const inputRef = useRef<HTMLInputElement>(null!);
  const uploadSection = useRef(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = inputRef.current.files[0] || '';
    if (!file) return;
    const src: string = getImgUrl(file);
    handleSelectedImg(file, src);
    searchImg(file, model, true, null);
    e.target.value = '';
  };

  const handleDrop = (
    files: FileList,
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    uploadSection.current.classList.remove('drag-enter');
    if (!files[0]) {
      return;
    }
    const src = getImgUrl(files[0]);
    handleSelectedImg(files[0], src);
    searchImg(files[0], model, true, null);
  };

  const handlerDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    uploadSection.current.classList.add('drag-enter');
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    uploadSection.current.classList.remove('drag-enter');
  };

  const handleModelChange = (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;
    setModel(value);
  };

  const generateFileUploader = () => {
    return (
      <div className={classes.uploadWrapper}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-model">Model</InputLabel>
          <Select
            value={model}
            onChange={handleModelChange}
            label="Select Model"
            inputProps={{
              name: 'Model',
              id: 'outlined-model',
            }}
          >
            {modelOptions.map(v => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <label htmlFor="upload-input-element">
          <Button
            variant="contained"
            color="primary"
            component="span"
            classes={{ root: classes.button }}
          >
            Upload Image
          </Button>
        </label>

        <input
          accept="image/*"
          className={classes.hidden}
          type="file"
          ref={inputRef}
          id="upload-input-element"
          onChange={handleInputChange}
        />
      </div>
    );
  };

  const generateSelectedHeader = selectedImg => {
    return (
      <section className={classes.selectedHeader}>
        <div className={classes.cropperWrapper}>
          <Cropper
            src={selectedImg.src}
            propSend={searchImg}
            className={classes.cropImgWrapper}
            imgClassName={classes.cropImg}
            viewMode={3}
          ></Cropper>
        </div>

        <div className={classes.btnsWrapper}>
          {generateFileUploader()}
          <div className={classes.resultWrapper}>
            <div className={classes.resultDesc}>
              <Typography variant="h4" className="text" component="p">
                Total Images: {count}
              </Typography>
              <Typography variant="h4" className="text" component="p">
                Duration:{' '}
                {!!Number(duration)
                  ? `${(duration as number) * 1000} ms`
                  : duration}
              </Typography>
            </div>
            <div className={classes.iconsWrapper}>
              <Link href="https://github.com/milvus-io/milvus">
                <img
                  src={'/images/reverse-image-search/github.svg'}
                  alt="github"
                />
              </Link>

              {!isMobile && (
                <Link href="https://github.com/milvus-io/milvus">
                  <img
                    src={'/images/reverse-image-search/email.svg'}
                    alt="email"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <section>
      {!selectedImg.isSelected ? (
        <FileDrop
          onDragOver={handlerDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="target"
        >
          <div className={classes.uploadSection} ref={uploadSection}>
            <Typography variant="h4" className="desc" component="p">
              {isMobile
                ? 'Click button to upload an image to try milvus vector similarity search.'
                : 'Drag or click button to upload an image to try milvus vector similarity search.'}
            </Typography>
            {generateFileUploader()}
          </div>
        </FileDrop>
      ) : (
        generateSelectedHeader(selectedImg)
      )}
    </section>
  );
};

export default UploaderHeader;
