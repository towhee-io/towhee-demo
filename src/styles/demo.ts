import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 86px)',
    overflow: 'auto',
  },

  backLink: {
    display: 'flex',
    color: '#000',
    alignItems: 'center',
    marginBottom: '27px',

    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },

    '& .back-btn': {
      padding: 0,
      color: '#000',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
      marginLeft: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    maxWidth: '1440px',
    width: '100%',
    padding: theme.spacing(5, 12.5, 0),
    margin: '0 auto',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2, 0),
    },
  },

  contentContainer: {
    flex: 1,
  },

  codeContainer: {
    flex: 1,
    background: '#303030',
    borderRadius: '16px',
    marginLeft: '20px',
  },

  uploadSection: {
    width: '100%',
    border: '1px dashed #000',
    padding: theme.spacing(9, 9),
    borderRadius: '4px',
    boxSizing: 'border-box',

    '& .desc': {
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '28px',
      color: '#82838E',
      textAlign: 'center',
      marginBottom: theme.spacing(5),
    },
  },
  uploadWrapper: {
    textAlign: 'center',
    '& .input': {
      display: 'none',
    },
  },
  layoutSection: {},
  loadingWrapper: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
