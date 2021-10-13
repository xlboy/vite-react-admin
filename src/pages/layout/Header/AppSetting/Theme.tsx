import { useAppIntl } from '@/locales';
import type { SystemState } from '@/store/types/system';
import { Badge, Button, Divider, Popover } from 'antd';
import React from 'react';
import { SketchPicker } from 'react-color';

export interface ThemeSetupProps {
  theme: SystemState['theme'];
  handleThemeChange(theme: ThemeSetupProps['theme']): void;
}

const ThemeSetup: React.FC<ThemeSetupProps> = props => {
  const { theme, handleThemeChange } = props;
  const { f } = useAppIntl();

  return (
    <p>
      <Popover
        content={
          <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={theme.primaryColor}
            onChange={({ hex }) => {
              handleThemeChange({ primaryColor: hex });
            }}
          />
        }
        trigger="click"
      >
        <Button type="text" block style={{ textAlign: 'left' }}>
          <Badge color={theme.primaryColor} text={f('主题色')} />
        </Button>
      </Popover>
    </p>
  );
};

export default ThemeSetup;
