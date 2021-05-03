export interface NavigationLink {
  path: string;
  order: number;
  text: string;
  children?: NavigationLink[];
  //key?: string;
  //isDropdown?: boolean;
  //dropdownIndex?: number;
  //dropdownLinks?: NavigationLink[];
}
