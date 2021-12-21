import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const buttonStyle = makeStyles((theme) => ({
  button: {
    borderRadius: '200px',
    padding: theme.spacing(1, 3),
    textTransform: 'initial',
  },
  textBtn: {
    color: theme.palette.primary.main,
  },
  containedBtn: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'initial',
    fontWeight: 'bold',
    lineHeight: '16px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      boxShadow: 'initial',
    },
  },
}));

// props types same as Material Button
const CustomButton = (props: any) => {
  const classes = buttonStyle();

  return (
    <Button
      {...props}
      classes={{
        root: classes.button,
        text: classes.textBtn,
        contained: classes.containedBtn,
      }}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
