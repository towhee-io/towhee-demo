import { makeStyles, Theme } from '@material-ui/core/styles';
import { PinDropSharp } from '@material-ui/icons';

export const useStyles = makeStyles((theme: Theme) => ({
  uploadSection: {
    width: '100%',
    border: '1px dashed #000',
    padding: theme.spacing(9, 9),
    borderRadius: '4px',
    boxSizing: 'border-box',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2.5),
    },

    '&.drag-enter': {
      border: '1px dashed #06aff2',
    },

    '& .desc': {
      color: '#82838E',
      textAlign: 'center',
      fontSize: '24px',
      lineHeight: '28px',
      marginBottom: theme.spacing(2),

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
        fontSize: '16px',
        lineHeight: '18px',
      },
    },
  },
  hidden: {
    display: 'none',
  },
  uploadWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(3, 0),
    // alignItems: (props: any) => (props.isSelectImg ? 'flex-start' : 'center'),
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0, 3, 0),
    },
  },
  selectedHeader: {
    boxSizing: 'border-box',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },

    '& .right': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  cropperWrapper: {
    background: '#555',
    borderRadius: '8px',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: '279px',
    maxWidth: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      maxWidth: '343px',
      width: '100%',
    },
  },
  btnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(3),
      flexDirection: 'row-reverse',
      maxWidth: '343px',
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  cropImgWrapper: {
    width: '247px',
    height: 'auto',

    '&>img': {
      width: '100%',
      height: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      height: '306px',
    },

    // '& img': {
    //   width: '100%',
    //   // height: (prop: any) => `${247 / prop.selectedImg.ratio}px`,
    //   height: '100%',
    // },

    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    //   height: '306px',

    //   '& img': {
    //     maxWidth: '100%',
    //     maxHeight: '306px',
    //   },
    // },
  },
  cropImg: {
    display: 'none',
  },
  resultWrapper: {},
  resultDesc: {
    marginBottom: theme.spacing(3),

    '& .text': {
      fontWeight: 400,
      color: '#82838E',
      fontSize: '16px',
      lineHeight: '18px',

      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        lineHeight: '16px',
      },
    },
  },
  iconsWrapper: {
    marginBottom: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },

    '& a:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  button: {
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Poppins Bold',
    background: '#06aff2',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  formControl: {
    minWidth: 120,
    width: '155px',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
  },

  uploadSectionWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      flexDirection: 'column',
    },
  },

  drainageContent: {
    margin: '32px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '35%',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      maxWidth: '100%',
    },
  },

  text: {
    fontSize: '16px',
    lineHeight: '26px',
    fontFamily: 'Poppins',
    fontWeight: 'bold',

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      fontSize: '14px',
      lineHeight: '22px',
    },
  },
}));
