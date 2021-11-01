import appConfig from '@/configs/app';
import { useAppIntl } from '@/locales';
import type { LocaleTypes } from '@/locales/types';
import { rootActions, useAppDispatch, useAppState } from '@/store';
import type { InUnionFillArrayItem } from '@/types/utils';
import { TranslationOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import { ReactComponent as IconEnUS } from '@/assets/icons/icon-enUS.svg';
import { ReactComponent as IconZhCN } from '@/assets/icons/icon-zhCN.svg';

interface LanguageOption {
  type: LocaleTypes;
  label: string;
  iconComponent: JSX.Element;
}

const languageIconClassName = 'w-20px h-50px';

const languageOptions: InUnionFillArrayItem<LanguageOption, LocaleTypes> = [
  {
    type: 'zh-CN',
    label: '简体中文',
    iconComponent: <IconZhCN className={languageIconClassName} />
  },

  {
    type: 'zh-TW',
    label: '繁体中文',
    iconComponent: <IconZhCN className={languageIconClassName} />
  },
  {
    type: 'en-US',
    label: 'English',
    iconComponent: <IconEnUS className={languageIconClassName} />
  }
];

const SwitchLanguage: React.FC = () => {
  const { locale: currentLocale } = useAppState(state => state.system);
  const storeDispatch = useAppDispatch();
  const { f } = useAppIntl();

  const switchCurrentLocale = (locale: LocaleTypes, label: string) => {
    const { setLocale } = rootActions.system;

    message.success(f('切换{locale}成功', { locale: label }));
    localStorage.setItem(appConfig.cacheKey.locale, locale);
    storeDispatch(setLocale(locale));
  };

  const DropdownMenu = (): JSX.Element => (
    <Menu>
      {languageOptions.map(({ iconComponent, type, label }) => (
        <Menu.Item
          key={type}
          icon={iconComponent}
          disabled={currentLocale === type}
          className="flex items-center !h-28px"
          onClick={switchCurrentLocale.bind(null, type, label)}
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={<DropdownMenu />} placement="bottomCenter" arrow>
      <Button type="text" icon={<TranslationOutlined />} />
    </Dropdown>
  );
};

export default SwitchLanguage;
