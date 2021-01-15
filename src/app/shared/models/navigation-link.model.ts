export interface NavigationLink {
  path: string;
  order: number;
  text: string;
  key?: string;
  isDropdown?: boolean;
  dropdownIndex?: number;
  dropdownLinks?: NavigationLink[];
}
