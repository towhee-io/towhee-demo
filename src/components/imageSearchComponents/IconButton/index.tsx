import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  linkWrapper: {
    textDecoration: 'none',
    display: 'inline-block',
    height: '24px',
    width: '24px',
    textAlign: 'center',
    lineHeight: '24px',
    boxSizing: 'border-box',
  },
  btnWrapper: {
    display: 'inline-block',
    height: '24px',
    width: '24px',
    padding: '3px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    cursor: 'pointer',

    '& img': {
      width: '18px',
      height: '18px',
    },
  },
}));

type ButtonPropsType = {
  type: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => {};
  classname?: string;
};

const IconButton: React.FC<ButtonPropsType> = props => {
  const classes = useStyles();

  const {
    type = 'link',
    href = '',
    onClick = () => {},
    classname = '',
  } = props;

  return (
    <>
      {type === 'link' ? (
        <a href={href} className={`${classes.linkWrapper} ${classname}`}>
          {props.children}
        </a>
      ) : (
        <button
          className={`${classes.btnWrapper} ${classname}`}
          onClick={onClick}
        >
          {props.children}
        </button>
      )}
    </>
  );
};

export default IconButton;
