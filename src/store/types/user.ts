export interface MenuItem {
  id: string;
  name: string;
  access: string;
  children?: MenuItem[];
}
