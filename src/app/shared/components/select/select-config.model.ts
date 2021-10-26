import { SelectDataGroup } from './select-data-group.model';

export interface SelectConfig {
  label?: string;
  showSelected: boolean;
  defaultText: string;
  data: SelectDataGroup[];
  multiple: boolean;
}
