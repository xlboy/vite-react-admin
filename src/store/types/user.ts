export interface UserState {
  userInfo: null | Record<string, string>;
  menuList: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  key: string;
  children?: MenuItem[];
}
