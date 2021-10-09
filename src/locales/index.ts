import { getAppState } from '@/store';
import type { GetStrTowCharRangeContent } from '@/types/utils';
import { createIntl } from '@formatjs/intl';
import type { Locale as AntdLocale } from 'antd/lib/locale-provider';
import type { IntlShape, MessageDescriptor } from 'react-intl';
import { useIntl } from 'react-intl';
import { rootAntdLocale, rootAppLocale } from './rootLocale';
import type { AppLocaleId, LocaleTypes } from './types';

export const getAntdLocale = (type: LocaleTypes) => rootAntdLocale[type] as unknown as AntdLocale;

export const getAppLocale = (type: LocaleTypes): Record<string, string> => {
  const localeIndexMap: Record<LocaleTypes, number> = {
    'zh-CN': 0,
    'zh-TW': 1,
    'en-US': 2
  };

  return Object.entries(rootAppLocale).reduce(
    (previousValue, [k, v]) => ({
      ...previousValue,
      [k]: v[localeIndexMap[type]]
    }),
    {}
  );
};

interface _FormatMessageProps extends MessageDescriptor {
  id: AppLocaleId;
}

type FormatMessageProps = (descriptor: _FormatMessageProps, options?: Record<string, string>) => string;

/**
 * @description 国际化插件的类型加工，完善ts提示
 */
const intlTypeProcess = (intl: IntlShape) => {
  const { formatMessage: _formatMessage, ...rest } = intl;
  const formatMessage: FormatMessageProps = _formatMessage;

  return {
    ...rest,
    formatMessage,
    f: <T extends AppLocaleId, PlaceholderKeys = GetStrTowCharRangeContent<T, '{', '}'>>(
      id: T,
      options?: Record<PlaceholderKeys extends string ? PlaceholderKeys : string, string>
    ) => formatMessage({ id }, options)
  };
};

export const useAppIntl = () => {
  const intl = useIntl();

  return intlTypeProcess(intl);
};

export const getAppIntl = () => {
  const {
    system: { locale: currentLocale }
  } = getAppState();

  const intl = createIntl({
    locale: currentLocale,
    messages: getAppLocale(currentLocale)
  });

  return intlTypeProcess(intl as IntlShape);
};
