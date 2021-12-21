import { DialogType } from '../../context/Types';
export type CustomDialogType = DialogType & { onClose: () => void };
