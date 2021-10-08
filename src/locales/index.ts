import type { GetStrTowCharRangeContent } from '@/types/utils';
import type { Locale as AntdLocale } from 'antd/lib/locale-provider';
import type { MessageDescriptor } from 'react-intl';
import { useIntl } from 'react-intl';
import { rootAntdLocale, rootAppLocale } from './rootLocale';
import type { AppLocaleId, LocaleTypes } from './types';

export const getAntdLocale = (type: LocaleTypes) => rootAntdLocale[type] as unknown as AntdLocale;

export const getAppLocale = (type: LocaleTypes): Record<string, string> => {
  const localeIndexMap: Record<LocaleTypes, number> = {
    zh_CN: 0,
    zh_TW: 1,
    en_US: 2
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

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
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
