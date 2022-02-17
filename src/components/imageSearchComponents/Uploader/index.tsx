import React, { useEffect, useRef, useState, useContext } from 'react';
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
import Cropper from '../Cropper';
import { useCheckIsMobile } from '../../../hooks/Style';
import { useStyles } from './style';
import { UploaderHeaderType } from '../../../types';
import { getModelOptions, getCount } from '../../../utils/http';
import { formatCount } from '../../../utils/helper';
import { rootContext } from '../../../context/Root';

const UploaderHeader: React.FC<any> = ({
  searchImgByFile,
  searchImgByPath,
  duration,
}) => {
  const classes = useStyles();
  const isMobile = useCheckIsMobile();
  const [model, setModel] = useState<string>('');
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [count, setCount] = useState<string>('0');
  const inputRef = useRef<HTMLInputElement>(null!);
  const uploadSection = useRef(null);
  const root = useContext(rootContext);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = inputRef.current.files[0] || '';
    if (!file) return;
    root.handleSelectFile(file);
    e.target.value = '';
  };

  const handleModelChange = (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;
    setModel(value);
    root.setModel(value);
  };

  const getInitialParams = async () => {
    try {
      const { model_list: options = [] } = await getModelOptions();
      setModelOptions(options);
      setModel(options[0]);
      root.setModel(options[0]);
      const count = await getCount(options[0]);
      setCount(formatCount(count));
      // searchImgByPath('/images/demo.jpeg', model);
      root.handleSelectFile('/images/demo.jpeg');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInitialParams();
  }, []);

  const generateDrainageContent = () => (
    <div className={classes.drainageContent}>
      <Typography variant="body1" component="p" className={classes.text}>
        Want to learn the techniques behind the scene? <br />
        See the{' '}
        <Link href="https://docs.towhee.io/tutorials/reverse-image-search">
          tutorial
        </Link>
        .
      </Typography>

      <div style={{ marginTop: '16px' }}>
        <Typography variant="body1" component="p" className={classes.text}>
          Demo resource:
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          Source code:{' '}
          <Link href="https://github.com/towhee-io/towhee">
            https://github.com/towhee-io/towhee
          </Link>
          .
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          Image dataset:{' '}
          <Link href="https://image-net.org/challenges/LSVRC/2012/">
            ImageNet2012
          </Link>
          .
        </Typography>
      </div>
    </div>
  );

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

  const generateSelectedHeader = () => {
    return (
      <div className={classes.selectedHeader}>
        <div className={classes.cropperWrapper}>
          <Cropper cropAndSearch={searchImgByFile} model={model}></Cropper>
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
                  ? `${(duration as number) / 100} s`
                  : duration}
              </Typography>
            </div>
            <div className={classes.iconsWrapper}>
              <Link href="https://github.com/towhee-io/towhee">
                <img
                  src={'/images/reverse-image-search/github.svg'}
                  alt="github"
                />
              </Link>

              <Link href="https://twitter.com/towheeio">
                <img
                  src={'/images/reverse-image-search/twitter.svg'}
                  alt="github"
                />
              </Link>

              <Link href="https://slack.towhee.io">
                <img
                  src={'/images/reverse-image-search/slack.svg'}
                  alt="github"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={classes.uploadSectionWrapper}>
      {/* {!selectedImg.isSelected ? (
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
      )} */}

      {generateSelectedHeader()}
      {generateDrainageContent()}
    </section>
  );
};

export default UploaderHeader;
