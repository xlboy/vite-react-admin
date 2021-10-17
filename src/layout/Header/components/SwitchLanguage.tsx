import type { LocaleTypes } from '@/locales/types';
import type { InUnionFillArrayItem } from '@/types/utils';
import { TranslationOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { ReactComponent as IconEnUS } from '../assets/icon-enUS.svg';
import { ReactComponent as IconZhCN } from '../assets/icon-zhCN.svg';
import type { SwitchCurrentLocale } from '../types';

interface SwitchLanguageProps {
  switchCurrentLocale: SwitchCurrentLocale;
  currentLocale: LocaleTypes;
}

interface LanguageOption {
  type: LocaleTypes;
  label: string;
  iconComponent: JSX.Element;
}

const languageIconStyle: React.CSSProperties = { width: 20, height: 25 };

const languageOptions: InUnionFillArrayItem<LanguageOption, LocaleTypes> = [
  {
    type: 'zh-CN',
    label: '简体中文',
    iconComponent: <IconZhCN style={languageIconStyle} />
  },

  {
    type: 'zh-TW',
    label: '繁体中文',
    iconComponent: <IconZhCN style={languageIconStyle} />
  },
  {
    type: 'en-US',
    label: 'English',
    iconComponent: <IconEnUS style={languageIconStyle} />
  }
];

const SwitchLanguage: React.FC<SwitchLanguageProps> = props => {
  const { switchCurrentLocale, currentLocale } = props;

  const DropdownMenu = (): JSX.Element => (
    <Menu>
      {languageOptions.map(({ iconComponent, type, label }) => (
        <Menu.Item
          key={type}
          icon={iconComponent}
          disabled={currentLocale === type}
          style={{ display: 'flex', alignItems: 'center', height: 28 }}
          onClick={switchCurrentLocale.bind(null, type, label)}
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={<DropdownMenu />} placement="bottomCenter" arrow>
      <Button type="text" icon={<TranslationOutlined />} style={{ height: '100%' }}></Button>
    </Dropdown>
  );
};

export default SwitchLanguage;
