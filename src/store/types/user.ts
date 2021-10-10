export interface UserState {
  menuList: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  key: string;
  children?: MenuItem[];
}
