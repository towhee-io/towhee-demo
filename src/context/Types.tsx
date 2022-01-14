export enum TrackingEventType {
  TRY_DEMO = 'try demo',
  WATCH_DEMO = 'watch demo',
  CTA_BUTTON = 'cta button',
}

export type TrackingParams = {
  type?: string;
  isRegistered?: boolean;
};

export type RootContextType = {
  openSnackBar: OpenSnackBarType;
  dialog: DialogType;
  setDialog: (params: DialogType) => void;
  handleCloseDialog: () => void;
  setGlobalLoading: (loading: boolean) => void;
  modal: DialogType;
  setModal: (params: DialogType) => void;
  handleCloseModal: () => void;
  setPreviewDialog: any;
  handleClosePreviewDialog: () => void;
  isShowMobileMask: string;
  setIsShowMobileMask: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  trackingEvent: (event: TrackingEventType, params: TrackingParams) => void;
  model: string;
  setModel: (params: string) => void;
};

export type DialogType = {
  open: boolean;
  type: 'notice' | 'custom';
  bgcolor?: string;
  params: {
    title?: string;
    component?: React.ReactNode;
    confirm?: () => void;
    cancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmClass?: string;
    cancelClass?: string;
  };
};
export type SnackBarType = {
  open: boolean;
  message: string;
  type?: 'error' | 'info' | 'success' | 'warning';
  autoHideDuration?: number | null;
  horizontal: 'center' | 'left' | 'right';
  vertical: 'bottom' | 'top';
};

export type OpenSnackBarType = (
  message: string,
  type?: 'error' | 'info' | 'success' | 'warning',
  autoHideDuration?: number | null,
  position?: {
    horizontal: 'center' | 'left' | 'right';
    vertical: 'bottom' | 'top';
  }
) => void;
