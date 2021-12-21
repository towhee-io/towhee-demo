import React, { FC } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';
import { CustomDialogType } from './Types';
import CustomButton from '../customButton/CustomButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      [theme.breakpoints.up(theme.breakpoints.values.md)]: {
        minWidth: '480px',
      },
      boxShadow: 'none',
      maxWidth: '100vw',
      borderRadius: '0px',
      padding: 0,
      backgroundColor: (props: { bgcolor: string }) => props.bgcolor,
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        margin: 0,
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
      },
    },
    padding: {
      padding: theme.spacing(4),
    },
    cancel: {
      color: theme.palette.common.black,
      opacity: 0.4,
    },
  })
);

const CustomDialog: FC<CustomDialogType> = props => {
  const { open, type, params, onClose, bgcolor = '#fff' } = props;
  const classes = useStyles({ bgcolor });
  const {
    title,
    component,
    confirm,
    confirmLabel = 'confirm',
    cancel,
    cancelLabel = 'cancel',
    confirmClass = '',
  } = params; // for notice type
  const { component: CustomComponent } = params; // for custom type
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
    <Dialog
      disableScrollLock={false}
      classes={{ paper: classes.paper }}
      open={open}
      onClose={onClose}
    >
      {type === 'notice' ? (
        <>
          <DialogTitle classes={{ root: classes.title }}>
            <Typography variant="body1">{title}</Typography>
          </DialogTitle>
          {component && (
            <DialogContent classes={{ root: classes.padding }}>
              {component}
            </DialogContent>
          )}
          <DialogActions classes={{ spacing: classes.padding }}>
            <CustomButton
              onClick={() => handleCancel()}
              className={classes.cancel}
              color="default"
            >
              {cancelLabel}
            </CustomButton>
            <CustomButton
              onClick={() => handleConfirm()}
              color="primary"
              variant="contained"
              className={confirmClass}
            >
              {confirmLabel}
            </CustomButton>
          </DialogActions>
        </>
      ) : (
        CustomComponent
      )}
    </Dialog>
  );
};

export default CustomDialog;
