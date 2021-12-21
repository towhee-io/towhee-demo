import React, { useRef, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import IconButton from '../IconButton';
import { getImgUrl } from '../../../utils/helper';
import { FileDrop } from 'react-file-drop';
import Cropper from '../Cropper';
import { useCheckIsMobile } from '../../../hooks/Style';

const useStyles = makeStyles((theme: Theme) => ({
  uploadSection: {
    width: '100%',
    border: '1px dashed #000',
    padding: theme.spacing(9, 9),
    borderRadius: '4px',
    boxSizing: 'border-box',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2.5),
    },

    '&.drag-enter': {
      border: '1px dashed #06aff2',
    },

    '& .desc': {
      color: '#82838E',
      textAlign: 'center',
      fontSize: '24px',
      lineHeight: '28px',
      marginBottom: theme.spacing(2),

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
        fontSize: '16px',
        lineHeight: '18px',
      },
    },
  },
  uploadWrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto',
    marginBottom: theme.spacing(1),

    '& .input': {
      display: 'none',
    },
  },
  uploadedWrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },

    '& .right': {
      display: 'flex',
      alignItems: 'center',
    },

    '& .background': {
      background: '#555',
      borderRadius: '8px',
      boxSizing: 'border-box',
      padding: theme.spacing(2),
      width: '279px',
      maxWidth: '50%',

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        maxWidth: '343px',
        width: '100%',
      },
    },
    '& .btns-wrppaer': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginLeft: theme.spacing(4),

      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(2),
        flexDirection: 'row',
        maxWidth: '343px',
        width: '100%',
        justifyContent: 'space-between',
      },
      // [theme.breakpoints.down('sm')]: {
      //   flex: 3
      // },
    },
    '& .result-desc': {
      marginBottom: theme.spacing(2),

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(0),
      },

      '& .text': {
        fontWeight: 400,
        color: '#82838E',
        fontSize: '16px',
        lineHeight: '18px',

        [theme.breakpoints.down('sm')]: {
          fontSize: '14px',
          lineHeight: '16px',
        },
      },
    },
    '& .icons-wrapper': {
      marginBottom: theme.spacing(0),

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
      },

      '& a:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
    },
  },
  cropImgWrapper: {
    width: '247px',
    height: '232px',

    '& img': {
      maxWidth: '247px',
      maxHeigth: '232px',
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '306px',

      '& img': {
        maxWidth: '100%',
        maxHeight: '306px',
      },
    },
  },
  cropImg: {
    // maxWidth: '263px',
    // maxHeigth: '232px',

    // [theme.breakpoints.down('sm')]: {
    //   maxWidth: '295px',
    //   maxHeigth: '306px',
    // },
    display: 'none',
  },
  button: {
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Poppins Bold',
    background: '#06aff2',
    marginTop: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

type UploaderHeaderType = {
  handleImgSearch: (
    file: File,
    reset: boolean,
    scrollPage: number | null
  ) => void;
  handleSelectedImg: (file: File, src: string) => void;
  toggleIsShowCode: () => void;
  selectedImg: string;
  count: string;
  duration: number | string;
};
const UploaderHeader: React.FC<UploaderHeaderType> = ({
  handleImgSearch,
  handleSelectedImg,
  toggleIsShowCode,
  selectedImg,
  count,
  duration,
}) => {
  const classes = useStyles({ selectedImg });
  const isMobile = useCheckIsMobile();
  const inputRef = useRef<HTMLInputElement>(null!);
  const uploadSection = useRef(null);

  const [modelOptions, setModelOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([
    {
      value: 0,
      label: 'modelOne',
    },
    {
      value: 1,
      label: 'modelTwo',
    },
    {
      value: 3,
      label: 'modelThree',
    },
  ]);
  const [model, setModel] = useState<number>(modelOptions[0].value);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = inputRef.current.files[0] || '';
    if (!file) return;
    const src: string = getImgUrl(file);
    handleSelectedImg(file, src);
    handleImgSearch(file, true, null);
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
    handleImgSearch(files[0], true, null);
  };

  const handlerDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    uploadSection.current.classList.add('drag-enter');
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    uploadSection.current.classList.remove('drag-enter');
  };

  const handleModelChange = (e: React.ChangeEvent<{ value: number }>) => {
    const { value } = e.target;
    setModel(value);
  };

  return (
    <section>
      {!selectedImg ? (
        <FileDrop
          onDragOver={handlerDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="target"
        >
          <div className={classes.uploadSection} ref={uploadSection}>
            {isMobile ? (
              <Typography variant="h4" className="desc" component="p">
                Click button to upload an image to try milvus vector similarity
                search.
              </Typography>
            ) : (
              <Typography variant="h4" className="desc" component="p">
                Drag or click button to upload an image to try milvus vector
                similarity search.
              </Typography>
            )}
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
                    <MenuItem key={v.value} value={v.value}>
                      {v.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input
                accept="image/*"
                className="input"
                id="contained-button-file"
                type="file"
                ref={inputRef}
                onChange={handleInputChange}
              />
              ·
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  classes={{ root: classes.button }}
                >
                  Upload Image
                </Button>
              </label>
            </div>
          </div>
        </FileDrop>
      ) : (
        <div className={classes.uploadedWrapper}>
          <div className="background">
            <Cropper
              src={selectedImg}
              propSend={handleImgSearch}
              className={classes.cropImgWrapper}
              imgClassName={classes.cropImg}
              viewMode={3}
            ></Cropper>
          </div>

          <div className="btns-wrppaer">
            {!isMobile ? (
              <>
                <div className={classes.uploadWrapper}>
                  <input
                    accept="image/*"
                    className="input"
                    id="contained-button-file"
                    type="file"
                    ref={inputRef}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      classes={{ root: classes.button }}
                    >
                      Upload Image
                    </Button>
                  </label>
                </div>
                <div className="result-desc">
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
                <div className="icons-wrapper">
                  <IconButton
                    type="link"
                    href="https://github.com/milvus-io/milvus"
                  >
                    <img
                      src={'/images/reverse-image-search/github.svg'}
                      alt="github"
                    />
                  </IconButton>

                  <IconButton type="link" href="mailto:info@milvus.com">
                    <img
                      src={'/images/reverse-image-search/email.svg'}
                      alt="github"
                    />
                  </IconButton>

                  {/* <IconButton type="button" onClick={toggleIsShowCode}>
                    <img
                      src={'/images/reverse-image-search/subtract.svg'}
                      alt="subtract"
                    />
                  </IconButton> */}
                </div>
              </>
            ) : (
              <>
                <div className="left">
                  <div className="icons-wrapper">
                    <IconButton
                      type="link"
                      href="https://github.com/milvus-io/milvus"
                    >
                      <img
                        src={'/images/reverse-image-search/github.svg'}
                        alt="github"
                      />
                    </IconButton>
                  </div>
                  <div className="result-desc">
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
                </div>
                <div className={`${classes.uploadWrapper} right`}>
                  <input
                    accept="image/*"
                    className="input"
                    id="contained-button-file"
                    type="file"
                    ref={inputRef}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      classes={{ root: classes.button }}
                    >
                      Upload Image
                    </Button>
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UploaderHeader;
