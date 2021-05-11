export interface NavigationLink {
  order: number;
  text: string;
  path?: string;
  children?: NavigationLink[];
  icon?: string;
  //key?: string;
  //isDropdown?: boolean;
  //dropdownIndex?: number;
  //dropdownLinks?: NavigationLink[];
}
