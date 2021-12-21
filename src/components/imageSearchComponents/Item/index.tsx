import React, { useContext } from 'react';
import { Box, Image } from 'gestalt';
import { makeStyles, Theme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { rootContext } from '../../../context/Root';
import PreviewItem from './PreviewItem';

const useStyles = makeStyles((theme: Theme) => ({
  imgWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',

    '&:hover': {
      '& .icon-mask': {
        transform: 'translateY(0)',
        visibility: 'visible',
      },
    },

    '& img': {
      position: 'absolute',
      borderRadius: '16px',
      cursor: 'zoom-in',
    },

    '& .icon-mask': {
      width: '100%',
      textAlign: 'right',
      padding: theme.spacing(0, 2),
      position: 'absolute',
      bottom: '0px',
      right: '0px',
      visibility: 'hidden',
      background: 'rgba(0, 0, 0, 0.3)',
      transition: 'all .1s ease-in-out',
      boxSizing: 'border-box',
      height: '40px',
      transform: 'translateY(-40px)',
      borderRadius: '0 0 16px 16px',
    },
  },

  iconWrapper: {
    cursor: 'pointer',
    display: 'inline-block',
    height: '24px',
    width: '24px',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '24px',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),

    '& .img': {
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      position: 'static',
      borderRadius: 0,
    },
  },

  textWrapper: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 500,
    color: '#010E29',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: theme.spacing(1),
      textAlign: 'left',
    },

    '& .title': {
      color: '#82838E',
      wordBreak: 'keep-all',
      fontSize: '16px',
      lineHeight: '18px',
      fontWeight: 400,

      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '16px',
      },
    },
    '& .distance': {
      color: '#010E29',
      fontSize: '16px',
      lineHeight: '18px',
      fontWeight: 500,

      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '16px',
      },
    },
  },
}));

type ItemPropsType = {
  data: {
    height: number;
    width: number;
    src: string;
    distance: number;
    origin_src: string;
  };
  isSelected: boolean;
  handleSearch: (param: string) => void;
};
const Item: React.FC<ItemPropsType> = props => {
  const {
    data: { height, width, src, distance, origin_src },
  } = props;
  const { setPreviewDialog, handleClosePreviewDialog } =
    useContext(rootContext);
  const classes = useStyles();

  const handlePreview = () => {
    setPreviewDialog({
      open: true,
      component: (
        <PreviewItem
          src={origin_src}
          distance={distance}
          handleSearch={props.handleSearch}
        />
      ),
      onClose: handleClosePreviewDialog,
    });
  };

  const searchThisPic = (e: React.MouseEvent<HTMLSpanElement>, src: string) => {
    e.stopPropagation();
    props.handleSearch(src);
  };

  return (
    <Box
      position="relative"
      className="ui-item"
      alignItems="center"
      // key={data.id}
      fit={true}
      padding={0}
    >
      <div
        className={classes.imgWrapper}
        onClick={handlePreview}
        draggable="true"
      >
        <Image
          alt="Test"
          color="#fff"
          naturalHeight={height}
          naturalWidth={width}
          src={src}
        />

        {/* <div className="icon-mask"> */}
        <span
          className={classes.iconWrapper}
          onClick={e => searchThisPic(e, src)}
        >
          <img
            className="img"
            src={'/images/reverse-image-search/search-black.svg'}
            alt="search"
          />
        </span>
        {/* </div> */}
      </div>
      {props.isSelected ? (
        <div className={classes.textWrapper}>
          <Typography variant="h4" className="title" component="h3">
            Similarity Metirc:&nbsp;&nbsp;
          </Typography>
          <Typography variant="h5" className="distance" component="p">
            {distance}
          </Typography>
        </div>
      ) : null}
    </Box>
  );
};

export default Item;
