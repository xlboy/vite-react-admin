/**
 * @description 根据联合类型的长度 填充N个指定的子元素至数组
 * @see https://github.com/xlboy/learn-note/blob/main/ts/type-challenges/other.ts#L33
 */
export type InUnionFillArrayItem<FillItem, Union, FillArray extends FillItem[] = [], C extends Union = Union> = [
  C
] extends [never]
  ? FillArray
  : C extends C
  ? InUnionFillArrayItem<FillItem, Exclude<Union, C>, [...FillArray, FillItem]>
  : never;

/**
 * @description 取字符串的长度
 * @see https://github.com/xlboy/learn-note/blob/main/ts/type-challenges/medium.ts#L337
 */
export type LengthOfString<
  StrSrouce extends string,
  StrArray extends string[] = []
> = StrSrouce extends `${infer StartChar}${infer RestChar}`
  ? LengthOfString<RestChar, [...StrArray, StartChar]>
  : StrArray['length'];

/**
 * 取模板字符串中指定的两个字符括住的内容，例取出 {与} 字符括住的内容： `Hello, {name}`，即name
 * @see https://github.com/xlboy/learn-note/blob/main/ts/type-challenges/other.ts#L88
 */

export type GetStrTowCharRangeContent<
  Str extends string,
  OneChar extends string,
  TowChar extends string,
  DefaultStr extends string = '',
  ContentArray extends string[] = [],
  IsRange extends boolean = false
> = [LengthOfString<OneChar>, LengthOfString<TowChar>] extends [1, 1]
  ? Str extends `${infer S}${infer RestS}`
    ? [S, IsRange] extends [OneChar, false]
      ? GetStrTowCharRangeContent<RestS, OneChar, TowChar, '', ContentArray, true>
      : [S, IsRange] extends [TowChar, true]
      ? GetStrTowCharRangeContent<RestS, OneChar, TowChar, ``, [DefaultStr, ...ContentArray], false>
      : IsRange extends true
      ? GetStrTowCharRangeContent<RestS, OneChar, TowChar, `${DefaultStr}${S}`, ContentArray, true>
      : GetStrTowCharRangeContent<RestS, OneChar, TowChar, '', ContentArray, false>
    : ContentArray[number]
  : '第一个或第二个字符的长度不可超过1';
