import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, Theme, CircularProgress } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { rootContext } from '../../../context/Root';
import { useCheckIsMobile } from '../../../hooks/Style';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  previewContainer: {
    textAlign: 'right',
    overflow: 'hidden',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& .icon-wrapper': {
      width: '24px',
      height: '24px',
      fontSize: '20px',
      textAlign: 'center',
      lineHeight: '24px',
    },

    '& .body1': {
      color: '#fff',
      fontSize: '16px',
      lineHeight: '18px',

      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '16px',
      },
    },

    '& .font-500': {
      fontWeight: 500,
    },
  },
  closeBtn: {
    textAlign: 'right',
    color: '#fff',
    width: '100%',

    '& .icon-wrapper': {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: '20px',
      textAlign: 'center',
      lineHeight: '24px',
      cursor: 'pointer',
    },
  },
  imgContent: {
    maxWidth: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    maxHeight: 'calc(100% - 54px)',
    fontSize: 0,
    position: 'relative',

    '& .img': {
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
    },

    '& .search-icon': {
      position: 'absolute',
      right: '16px',
      bottom: '16px',
    },
  },

  desc: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#fff',
    height: '34px',
    width: '100%',
    marginTop: '30px',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
    },

    '& .text': {
      fontWeight: 700,
      color: '#fff',
      textAlign: 'left',
    },

    '& .searc-btn': {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',

      '& .searc-btn, & .text': {
        pointerEvents: 'none',
      },
    },

    '& .distance': {
      display: 'flex',
      alignItems: 'center',

      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
  },
}));

type PreviewItemPropsType = {
  src: string;
  distance: number;
};

const PreviewItem: React.FC<any> = ({ src, distance }) => {
  const { handleClosePreviewDialog, handleSelectFile } =
    useContext(rootContext);
  const isMobile = useCheckIsMobile();
  const classes = useStyles();
  const [loading, setLoding] = useState(true);

  const handleClickSearch = () => {
    console.log(src);
    handleSelectFile(src);
    handleClosePreviewDialog();
  };

  useEffect(() => {
    const image = document.createElement('img');
    image.src = src;
    image.onload = () => {
      setLoding(false);
    };
  }, [src]);

  return (
    <div className={classes.previewContainer}>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <p className={classes.closeBtn}>
            <span className="icon-wrapper" onClick={handleClosePreviewDialog}>
              <CloseIcon />
            </span>
          </p>
          <div className={classes.imgContent}>
            <img src={src} alt="test" className="img" />
          </div>
          <div className={classes.desc}>
            <div className="distance">
              <Typography variant="h4" className="body1" component="p">
                Similarity Metric:
              </Typography>
              <Typography variant="h4" className="body1" component="p">
                {distance}
              </Typography>
            </div>

            <div className="searc-btn" onClick={handleClickSearch}>
              <span className="icon-wrapper">
                <img
                  src={'/images/reverse-image-search/search-white.svg'}
                  alt="search-icon"
                />
              </span>
              {!isMobile ? (
                <Typography
                  variant="h4"
                  className="body1 font-500"
                  component="p"
                >
                  &nbsp;&nbsp;Search
                </Typography>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewItem;
