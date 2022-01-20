import React, { useState, useCallback, useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Backdrop, CircularProgress, useMediaQuery } from '@material-ui/core';

import {
  RootContextType,
  DialogType,
  SnackBarType,
  OpenSnackBarType,
  TrackingEventType,
  TrackingParams,
} from './Types';
import CustomSnackBar from '../components/customSnackBar/CustomSnackBar';
import CustomDialog from '../components/customDialog/CustomDialog';
import lightBlue from '@material-ui/core/colors/lightBlue';
import CustomModal from '../components/customDialog/CustomModal';
import { uuid } from 'uuidv4';
import ImagePreviewDialog from '../components/imageSearchComponents/CustomDialog';
import {
  getImgUrl,
  convertBase64UrlToBlob,
  getBase64Image,
} from '../utils/helper';

const COOKIE_UUID = 'z_uuid';
let amplitude: any = null;
if (typeof window !== 'undefined') {
  amplitude = require('amplitude-js');
}
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    zilliz: Palette['primary'];
    zillizGray: Palette['primary'];
  }
  interface PaletteOptions {
    zilliz: PaletteOptions['primary'];
    zillizGray: Palette['primary'];
  }
}
const DefaultDialogConfigs: DialogType = {
  open: false,
  bgcolor: '#fff',
  type: 'notice',
  params: {
    title: '',
    component: <></>,
    confirm: () => {},
    cancel: () => {},
  },
};

const DefaultModalConfigs: DialogType = {
  open: false,
  type: 'notice',
  params: {
    title: '',
    component: <></>,
    confirm: () => {},
    cancel: () => {},
  },
};

export const rootContext = React.createContext<RootContextType>({
  openSnackBar: (
    message,
    type = 'success',
    autoHideDuration,
    position = { vertical: 'top', horizontal: 'right' }
  ) => {},
  dialog: DefaultDialogConfigs,
  setDialog: params => {},
  handleCloseDialog: () => {},
  setGlobalLoading: () => {},
  modal: DefaultModalConfigs,
  setModal: params => {},
  handleCloseModal: () => {},
  setPreviewDialog: () => {},
  handleClosePreviewDialog: () => {},
  isShowMobileMask: '',
  setIsShowMobileMask: (params: string) => {},
  userId: '',
  trackingEvent: (event: TrackingEventType, params: {}) => {},
  model: '',
  setModel: (param: string) => {},
  fileSrc: {
    src: '',
    file: null,
    isSelected: false,
  },
  handleSelectFile: (param: File | Blob | string) => {},
});

const commonThemes = {
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#06aff2',
      dark: '#010e29',
      light: '#156cdd',
    },
    error: {
      main: '#ea3b3b',
    },
    warning: {
      main: '#ffaa3b',
      dark: '#F25C05',
    },
    success: {
      main: '#17bf17',
    },
    zilliz: {
      ...lightBlue,
      light: lightBlue[50],
    },
    zillizGray: {
      main: '#aeaebb',
      light: '#dcdce3',
      dark: '#f8f8fc',
      contrastText: '#000',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1025,
      lg: 1200,
      xl: 1920,
    },
  },
  spacing: (factor: any) => `${8 * factor}px`,
};

const theme = createMuiTheme({
  ...commonThemes,
  overrides: {
    MuiTypography: {
      button: {
        textTransform: 'initial',
        lineHeight: '16px',
        fontWeight: 'bold',
      },
      h1: {
        fontFamily: 'Poppins Bold',
        fontSize: '48px',
        lineHeight: '60px',
      },
      h2: {
        fontFamily: 'Poppins Bold',
        lineHeight: '42px',
        fontSize: '36px',
      },
      h3: {
        fontFamily: 'Poppins Bold',
        lineHeight: '40px',
        fontSize: '28px',
      },
      h4: {
        fontFamily: 'Poppins',
        lineHeight: '36px',
        fontSize: '24px',
        letterSpacing: '-0.005em',
      },
      h5: {
        // fontWeight: 'bold',
        fontFamily: 'Poppins Bold',
        fontSize: '20px',
        lineHeight: '28px',
        letterSpacing: '-0.005em',
      },
      h6: {
        fontFamily: 'Poppins Bold',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      body1: {
        fontSize: '14px',
        lineHeight: '22px',
        fontFamily: 'Lato',
        letterSpacing: '0.01em',
      },
      body2: {
        fontSize: '14px',
        lineHeight: '16px',
        fontFamily: 'Lato Bold',
        letterSpacing: '-0.005em',
      },
    },
    MuiButton: {
      root: {
        borderRadius: '200px',
        padding: `${commonThemes.spacing(1)} ${commonThemes.spacing(3)}`,
        textTransform: 'capitalize',
        width: 'fit-content',
        lineHeight: '16px',
      },
      text: {
        color: '#12c3f4',
        padding: `${commonThemes.spacing(1)} ${commonThemes.spacing(3)}`,
      },
      contained: {
        color: '#fff',
        backgroundColor: '#12c3f4',
        boxShadow: 'initial',

        '&:hover': {
          backgroundColor: '#65daf8',
          boxShadow: 'initial',
        },
      },
      containedPrimary: {
        color: '#fff',
        backgroundColor: '#12c3f4',

        '&:hover': {
          backgroundColor: '#65daf8',
        },
      },
    },
    MuiDialogActions: {
      spacing: {
        padding: commonThemes.spacing(4),
      },
    },
    MuiDialogContent: {
      root: {
        padding: `${commonThemes.spacing(1)} ${commonThemes.spacing(4)}`,
      },
    },
    MuiDialogTitle: {
      root: {
        padding: commonThemes.spacing(4),
        paddingBottom: commonThemes.spacing(1),
      },
    },
  },
});

const mobileTheme = createMuiTheme({
  ...commonThemes,
  overrides: {
    MuiTypography: {
      button: {
        textTransform: 'initial',
        lineHeight: '16px',
        fontWeight: 'bold',
      },
      h1: {
        fontFamily: 'Poppins Bold',
        fontSize: '40px',
        lineHeight: '54px',
      },
      h2: {
        fontFamily: 'Poppins Bold',
        fontSize: '32px',
        lineHeight: '40px',
      },
      h3: {
        fontFamily: 'Poppins Bold',
        fontSize: '24px',
        lineHeight: '30px',
      },
      h4: {
        fontFamily: 'Poppins',
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      h5: {
        // fontWeight: 'bold',
        fontFamily: 'Poppins Bold',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      h6: {
        fontFamily: 'Poppins Bold',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '-0.005em',
      },
      body1: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '-0.005em',
      },
      body2: {
        fontFamily: 'Poppins',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '-0.005em',
      },
    },
    MuiButton: {
      root: {
        borderRadius: '200px',
        padding: `${commonThemes.spacing(1)} ${commonThemes.spacing(3)}`,
        textTransform: 'capitalize',
        width: 'fit-content',
        lineHeight: '16px',
      },
      text: {
        color: '#12c3f4',
        padding: `${commonThemes.spacing(1)} ${commonThemes.spacing(3)}`,
      },
      contained: {
        color: '#fff',
        backgroundColor: '#12c3f4',
        boxShadow: 'initial',

        '&:hover': {
          backgroundColor: '#65daf8',
          boxShadow: 'initial',
        },
      },
      containedPrimary: {
        color: '#fff',
        backgroundColor: '#12c3f4',

        '&:hover': {
          backgroundColor: '#65daf8',
        },
      },
    },
    MuiDialogActions: {
      spacing: {
        padding: commonThemes.spacing(4),
      },
    },
    MuiDialogContent: {
      root: {
        padding: `${commonThemes.spacing(1)} ${commonThemes.spacing(4)}`,
      },
    },
    MuiDialogTitle: {
      root: {
        padding: commonThemes.spacing(4),
        paddingBottom: commonThemes.spacing(1),
      },
    },
  },
});

const { Provider } = rootContext;
// Dialog has two type : normal | custom;
// notice type mean it's a notice dialog you need to set props like title, content, actions
// custom type could have own state, you could set a complete component in dialog.
export const RootProvider = (props: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery('(max-width:1024px)');
  // this userid is for amplitude . will store in localstorage
  const [userId, setUserId] = useState('');
  const [snackBar, setSnackBar] = useState<SnackBarType>({
    open: false,
    type: 'success',
    message: '',
    vertical: 'top',
    horizontal: 'right',
    autoHideDuration: 3000,
  });
  const [dialog, setDialog] = useState<DialogType>(DefaultDialogConfigs);
  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    onClose: () => {},
    component: <></>,
  });
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  const [isShowMobileMask, setIsShowMobileMask] = useState<string>('');

  const [modal, setModal] = useState<DialogType>(DefaultModalConfigs);

  const [model, setModel] = useState<string>('');
  const [fileSrc, setFileSrc] = useState<{
    src: string;
    file: File | Blob;
    isSelected: boolean;
  }>({
    src: '',
    file: null,
    isSelected: false,
  });

  const handleSelectFile = (file: string | File | Blob) => {
    if (typeof file === 'string') {
      let image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = file;
      image.onload = () => {
        console.log('new image loaded');
        const base64 = getBase64Image(image);
        const blob = convertBase64UrlToBlob(base64);
        console.log('blob--', blob);
        setFileSrc({
          src: file,
          file: blob,
          isSelected: true,
        });
      };
    } else {
      let src = getImgUrl(file);
      setFileSrc({
        src: src,
        file: file,
        isSelected: true,
      });
    }
  };

  const handleSnackBarClose = () => {
    setSnackBar(v => ({ ...v, open: false }));
  };

  const openSnackBar: OpenSnackBarType = useCallback(
    (
      message = '',
      type = 'success',
      autoHideDuration: number | null | undefined = 2000,
      position = { vertical: 'top', horizontal: 'right' }
    ) => {
      setSnackBar({
        open: true,
        message,
        type,
        autoHideDuration,
        ...position,
      });
    },
    []
  );

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      open: false,
      bgcolor: 'transparent',
      type: 'custom',
      params: {
        title: '',
        component: <></>,
        confirm: () => {},
        cancel: () => {},
      },
    });
  };

  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  useEffect(() => {
    if (!window.location.href.includes('zilliz.com')) return;
    const uniqueId = window.localStorage.getItem(COOKIE_UUID) || `z-${uuid()}`;
    window.localStorage.setItem(COOKIE_UUID, uniqueId);
    setUserId(uniqueId);
    amplitude.getInstance().init('904cf0755352b9c3c0fd29b648bd0fda', uniqueId);
  }, []);

  const trackingEvent = (event: string, params: TrackingParams) => {
    if (!window.location.href.includes('zilliz.com')) return;
    amplitude.getInstance().logEvent(event, params || {});
  };

  const handleClosePreviewDialog = () => {
    setPreviewDialog({
      open: false,
      onClose: () => {},
      component: <></>,
    });
  };

  return (
    <Provider
      value={{
        openSnackBar,
        dialog,
        setDialog,
        handleCloseDialog,
        setGlobalLoading,
        modal,
        setModal,
        handleCloseModal,
        setPreviewDialog,
        handleClosePreviewDialog,
        isShowMobileMask,
        setIsShowMobileMask,
        userId,
        trackingEvent,
        model,
        setModel,
        fileSrc,
        handleSelectFile,
      }}
    >
      <ThemeProvider theme={isMobile ? mobileTheme : theme}>
        <CustomSnackBar {...snackBar} onClose={handleSnackBarClose} />
        {props.children}
        <CustomDialog {...dialog} onClose={handleCloseDialog} />
        <CustomModal {...modal} onClose={handleCloseModal} />
        <ImagePreviewDialog
          open={previewDialog.open}
          component={previewDialog.component}
          onClose={handleClosePreviewDialog}
        />
        <Backdrop open={globalLoading} style={{ zIndex: 2000 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </Provider>
  );
};
