import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  customDialog: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'none',

    '&.open': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  contentContainer: {
    maxWidth: '80%',
    maxHeight: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      maxHeight: '90%',
    },

    '& .close-btn': {
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

    '& .content': {
      borderRadius: '16px',
      // width: '100%',
      // height: 'calc(100% - 24px)',

      '& > *': {
        width: '100%',
        height: '100%',
      },
    },
  },
}));

const CustomDialog = ({ open, onClose, component: Component }) => {
  const classes = useStyles();

  const handleClickOut = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${classes.customDialog} ${open ? 'open' : ''}`}
      onClick={handleClickOut}
    >
      <div className={classes.contentContainer}>
        <div className="content">{Component}</div>
      </div>
    </div>
  );
};

export default CustomDialog;
