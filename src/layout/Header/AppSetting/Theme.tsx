import { useStates } from '@/hooks';
import { useAppIntl } from '@/locales';
import type { SystemState } from '@/store/types/system';
import { Badge, Button, Popover } from 'antd';
import React, { memo } from 'react';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

export interface ThemeSetupProps {
  theme: SystemState['theme'];
  handleThemeChange(theme: ThemeSetupProps['theme']): void;
}

interface CoreColorsPickerProps {
  color: string;
  handleChange(colorResult?: ColorResult): void;
  themeName: string;
}

const ColorPickerRow: React.FC<CoreColorsPickerProps> = props => {
  const { themeName, handleChange } = props;
  const [{ currentColor }, setStates] = useStates({
    currentColor: props.color
  });

  return (
    <Popover
      placement="leftTop"
      content={
        <div>
          <SketchPicker
            styles={{ default: { picker: { boxShadow: 'none' } } }}
            presetColors={['#13c2c2', '#1890ff', '#25b864', '#ff6f00']}
            color={currentColor}
            onChange={colorResult => {
              handleChange(colorResult);
              setStates({ currentColor: colorResult.hex });
            }}
          />
        </div>
      }
      trigger="click"
    >
      <Button type="text" block style={{ textAlign: 'left' }}>
        <Badge color={currentColor} text={themeName} />
      </Button>
    </Popover>
  );
};

const ThemeSetup: React.FC<ThemeSetupProps> = props => {
  const { theme, handleThemeChange } = props;
  const { f } = useAppIntl();

  return (
    <p>
      <ColorPickerRow
        color={theme.primaryColor ?? ''}
        handleChange={colorResult => {
          colorResult && handleThemeChange({ primaryColor: colorResult.hex });
        }}
        themeName={f('主题色')}
      />
    </p>
  );
};

export default memo(ThemeSetup);
