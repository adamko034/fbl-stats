import { SelectDialogOption } from './select-dialog-option.model';

export interface SelectDialogConfig {
  label: string;
  noItemsSelectedLabel?: string;
  itemsSelectedLabel?: string;
  openDialogLabel?: string;
  options: SelectDialogOption[];
  onlyIconOnMobile?: boolean;
}
