import { makeStyles, Theme } from '@material-ui/core';

export const getCTAButtonStyle = () => {
  const getBtnStyles = makeStyles((theme: Theme) => ({
    '@keyframes anime': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },

    btn: {
      padding: 0,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
    },

    base: {
      display: 'inline-block',
      fontWeight: 'bold',
      lineHeight: '150%',
      textAlign: 'center',
      cursor: 'pointer',
      letterSpacing: '-0.005em',
      minWidth: '100px',
      width: 'inherit',
    },

    contained: {
      position: 'relative',

      background: theme.palette.primary.main,
      color: '#fff',

      '&:hover': {
        background:
          'linear-gradient(-25deg, #06AFF2, #156CDD, #010E29, #156CDD, #06F3AF, #06AFF2)',
        backgroundSize: '1000%',
        animation: '$anime 8s linear infinite',

        '& div': {
          opacity: 0.8,
        },
      },

      '&:active': {
        background: theme.palette.primary.dark,
        backgroundSize: '100%',
        animation: 'none',

        '& div': {
          visibility: 'hidden',
          opacity: 0,
          transition: 'none',
        },
      },
    },

    linkContained: {
      borderRadius: '20px 0',
      padding: theme.spacing(2, 4),
    },

    containedDisable: {
      color: '#fff',
      cursor: 'default',
      background: theme.palette.zillizGray.light,
    },

    content: {
      position: 'relative',
      zIndex: 5,
      display: 'inline-block',
      whiteSpace: 'nowrap',
    },

    containedShadow: {
      background:
        'linear-gradient(-25deg, #06AFF2, #156CDD, #010E29, #156CDD, #06F3AF, #06AFF2)',
      backgroundSize: '1000%',

      animation: '$anime 8s linear infinite',
      minWidth: '100px',
      height: '40px',

      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      marginTop: theme.spacing(4),
      filter: 'blur(30px)',
      opacity: 0,

      transition: 'all 1s ease',
    },

    outline: {
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      transition: 'all 0.3s ease',

      '&:hover': {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark,
      },

      '&:active': {
        color: '#fff',
        backgroundColor: theme.palette.primary.dark,
      },
    },

    outlineDisable: {
      color: theme.palette.zillizGray.light,
      cursor: 'default',
      border: `2px solid ${theme.palette.zillizGray.light}`,
    },

    textBase: {
      display: 'inline-block',
      cursor: 'pointer',
      fontWeight: 600,
      lineHeight: '140%',
      letterSpacing: '-0.005em',
      padding: theme.spacing(1.5, 2.5),
    },

    text: {
      borderRadius: '0 20px',
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: '#F8F8FC',
      },

      '&:active': {
        color: theme.palette.primary.dark,
      },
      '& a': {
        textDecoration: 'none',
      },
    },

    textDisable: {
      color: theme.palette.zillizGray.light,
      cursor: 'default',
    },

    icon: {
      position: 'relative',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      // width: '64px',
      // height: '64px',
      width: '52px',
      height: '52px',

      background: theme.palette.primary.main,

      cursor: 'pointer',

      [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
        width: '49px',
        height: '49px',
      },

      '&:hover': {
        background:
          'linear-gradient(-25deg, #06AFF2, #156CDD, #010E29, #156CDD, #06F3AF, #06AFF2)',
        backgroundSize: '1000%',
        animation: '$anime 8s linear infinite',

        '& div': {
          opacity: 0.8,
        },
      },

      '&:active': {
        background: theme.palette.primary.dark,
        backgroundSize: '100%',
        animation: 'none',

        '& div': {
          visibility: 'hidden',
          opacity: 0,
          transition: 'none',
        },
      },
    },
    iconShadow: {
      background:
        'linear-gradient(-25deg, #06AFF2, #156CDD, #010E29, #156CDD, #06F3AF, #06AFF2)',
      backgroundSize: '1000%',

      animation: '$anime 8s linear infinite',
      // width: '64px',
      // height: '64px',
      width: '52px',
      height: '52px',

      [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
        width: '49px',
        height: '49px',
      },

      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      marginTop: theme.spacing(1),
      filter: 'blur(10px)',
      opacity: 0,

      transition: 'all 1s ease',
    },
    iconContent: {
      transform: 'translateY(3px)',
    },
    iconImg: {
      transform: 'translateX(1px)',
    },

    nav: {
      borderRadius: '20px 0',
      padding: theme.spacing(1, 3),

      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'none',
      },
    },

    outLine: {
      borderRadius: '20px 0',
      padding: theme.spacing(1, 3),
      border: 'none',
      outline: 'none',

      '&:hover': {
        textDecoration: 'none',
      },
    },
  }));

  return getBtnStyles();
};
