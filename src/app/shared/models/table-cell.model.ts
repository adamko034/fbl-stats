export interface TableCell {
  value: number;
  header: string;
  order: number;
  description: string;
  defaultSort?: boolean;
  hideOnMd?: boolean;
  includeInTotal?: boolean;
}
