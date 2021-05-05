export interface NavigationLink {
  path: string;
  order: number;
  text: string;
  children?: NavigationLink[];
  icon?: string;
  //key?: string;
  //isDropdown?: boolean;
  //dropdownIndex?: number;
  //dropdownLinks?: NavigationLink[];
}
