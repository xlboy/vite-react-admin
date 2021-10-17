import type { LocaleTypes } from '@/locales/types';

export type RouteInfos = Array<{ title: string; path: string }>;

export type SwitchCurrentLocale = (locale: LocaleTypes, label: string) => void;
