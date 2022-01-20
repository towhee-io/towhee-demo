import React, { useMemo, useContext } from 'react';
import { rootContext } from '../../../context/Root';
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
    marginTop: '24px',
    '&.open': {
      width: '50%',
    },
  },

  toopTip: {
    display: 'flex',
    alignItems: 'center',
    visibility: 'hidden',

    '&.open': {
      visibility: 'visible',
    },
  },
}));

type MainPropsType = {
  pins: ImgsList;
  loadItems: () => void;
  loading: boolean;
  isSelected: boolean;
  isShowCode: boolean;
  rechooseFile: (param: any) => void;
  container: any;
};
const Main: React.FC<any> = ({ pins, loadItems, loading, container }) => {
  const classes = useStyles();
  const isMobile = useCheckIsMobile();
  const { fileSrc } = useContext(rootContext);

  return useMemo(
    () => (
      <div className={classes.scrollContainer}>
        <div
          className={`${classes.toopTip} ${fileSrc.isSelected ? 'open' : ''}`}
        >
          <Typography variant="h4" className="body1" component="p">
            The results are sorted by normalized L2 distance, range from 0 to 2,
            smaller is better.
          </Typography>
        </div>

        <div className={classes.imgContainer}>
          {pins.length ? (
            <Masonry
              columnWidth={isMobile ? 154 : 290}
              virtualize={false}
              comp={({ data }) => (
                <Item data={data} isSelected={fileSrc.isSelected} />
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
    [pins, loadItems, loading, container, isMobile]
  );
};

export default Main;
