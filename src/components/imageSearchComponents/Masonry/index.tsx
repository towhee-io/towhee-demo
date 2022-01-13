import React, { useMemo } from 'react';
import { Masonry } from 'gestalt';
import { CircularProgress, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useCheckIsMobile } from '../../../hooks/Style';
import { ImgsList } from '../../../types/Demos';

import Item from '../Item';

const useStyles = makeStyles((theme: Theme) => ({
  scrollContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '200px',
    paddingTop: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1),
      minHeight: '100px',
    },

    '& .body1': {
      color: '#010E29',
      fontSize: '16px',
      lineHeight: '18px',

      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '16px',
      },
    },

    '&.open': {
      width: '100%',
    },

    '& .loading-wrapper': {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  imgContainer: {
    marginTop: '34px',
    '&.open': {
      width: '50%',
    },
  },

  toopTip: {
    display: 'flex',
    alignItems: 'center',
    visibility: 'hidden',
    position: 'absolute',

    '&.open': {
      visibility: 'visible',
    },

    '& .icon-wrapper': {
      height: '26px',
      width: '26px',
      fontSize: '16px',
      marginLeft: '8px',
      cursor: 'pointer',
      borderRadius: '50%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:hover': {
        background: '#E9E9ED',
        '&::after': {
          visibility: 'visible',
          opacity: 1,
          zIndex: 1,
        },
      },

      '&::after': {
        content:
          '"The results are sorted by normalized L2 distance, range from 0 to 2, smaller is better."',
        background: '#232F34',
        borderRadius: '4px',
        padding: '5px 10px',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#fff',
        position: 'absolute',
        visibility: 'hidden',
        opacity: 0,
        // left: '50%',
        // transform: 'translateX(-50%)',
        // top: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '32px',
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('sm')]: {
          top: '34px',
        },
      },

      '& svg': {
        fontSize: '16px',
      },
    },
  },
}));

type MainPropsType = {
  pins: ImgsList;
  loadItems: () => void;
  loading: boolean;
  isSelected: boolean;
  isShowCode: boolean;
  handleSearch: (param: string) => void;
  container: any;
  model: string;
};
const Main: React.FC<MainPropsType> = ({
  pins,
  loadItems,
  loading,
  isSelected,
  isShowCode,
  handleSearch,
  container,
  model,
}) => {
  const classes = useStyles();
  const isMobile = useCheckIsMobile();

  return useMemo(
    () => (
      <div className={`${classes.scrollContainer} ${isShowCode ? 'open' : ''}`}>
        <div className={`${classes.toopTip} ${isSelected ? 'open' : ''}`}>
          <Typography variant="h4" className="body1" component="p">
            Sorted by Similarity metric
          </Typography>
          <span className="icon-wrapper">
            <ErrorOutlineIcon />
          </span>
        </div>

        <div className={classes.imgContainer}>
          {pins.length ? (
            <Masonry
              columnWidth={isMobile ? 154 : 290}
              virtualize={false}
              comp={({ data }) => (
                <Item
                  data={data}
                  isSelected={isSelected}
                  handleSearch={handleSearch}
                  model={model}
                />
              )}
              items={pins}
              gutterWidth={16}
              loadItems={loadItems}
              scrollContainer={() => container.current}
              minCols={2}
            ></Masonry>
          ) : null}
        </div>
        {loading ? (
          <div className="loading-wrapper">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    ),
    [
      pins,
      loadItems,
      loading,
      isSelected,
      isShowCode,
      handleSearch,
      container,
      isMobile,
    ]
  );
};

export default Main;
