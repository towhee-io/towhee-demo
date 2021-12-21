import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import CTAButton from '../ctaButton/ctaButton';
import { CustomDialogType } from './Types';

const getStyles = makeStyles((theme: Theme) => ({
  paper: {
    minWidth: '600px',
    maxWidth: '100vw',
    boxShadow: '10px 20px 50px rgba(0, 0, 0, 0.15)',
    borderRadius: '30px 0px',
    padding: 0,

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      minWidth: '343px',
    },
  },
  title: {
    padding: theme.spacing(4),

    '& p': {
      fontWeight: '500',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '300px',
      fontSize: '20px',
      color: theme.palette.primary.main,
    },
  },
  padding: {
    padding: theme.spacing(4),
  },
  cancel: {
    color: theme.palette.common.black,
    opacity: 0.4,
  },
}));

const CustomModal: FC<CustomDialogType> = props => {
  const classes = getStyles();
  const { open, type, params, onClose } = props;
  // notice
  const {
    title,
    component,
    confirm,
    confirmLabel = 'confirm',
    cancel,
    cancelLabel = 'cancel',
    confirmClass = '',
    cancelClass = '',
  } = params;
  // custom
  const { component: CustomComponent } = params;

  const handleConfirm = async () => {
    if (confirm) {
      await confirm();
    }
    onClose();
  };

  const handleCancel = async () => {
    if (cancel) {
      await cancel();
    }
    onClose();
  };

  return (
    <Dialog classes={{ paper: classes.paper }} open={open} onClose={onClose}>
      {type === 'notice' ? (
        <>
          <DialogTitle classes={{ root: classes.title }}>
            <Typography>{title}</Typography>
          </DialogTitle>
          {component && (
            <DialogContent classes={{ root: classes.padding }}>
              {component}
            </DialogContent>
          )}
          <DialogActions classes={{ spacing: classes.padding }}>
            <CTAButton
              variant="text"
              onClick={() => handleCancel()}
              className={`${classes.cancel} ${cancelClass}`}
            >
              {cancelLabel}
            </CTAButton>
            <CTAButton
              onClick={() => handleConfirm()}
              variant="nav"
              className={confirmClass}
            >
              {confirmLabel}
            </CTAButton>
          </DialogActions>
        </>
      ) : (
        CustomComponent
      )}
    </Dialog>
  );
};

export default CustomModal;
