export interface NavigationLink {
  path: string;
  order: number;
  text: string;
  isDropdown?: boolean;
  dropdownLinks?: NavigationLink[];
}
