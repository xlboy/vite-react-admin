/**
 * @description 根据联合类型的长度 填充N个指定的子元素至数组
 * @example
 *
 * type FormTypes = 'email' | 'phone';
 * type FillContent = { test: number };
 * type FormValues = InUnionFillArrayItem<FillContent, FormTypes>;
 * // FormValues = [FillContent, FillContent]
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
 * @example
 *
 * const onePieceStr = 'one-piece';
 * type OnePieceStrLength = LengthOfString<typeof onePieceStr>;
 * // OnePieceStrLength = 9
 */
export type LengthOfString<
  StrSrouce extends string,
  StrArray extends string[] = []
> = StrSrouce extends `${infer StartChar}${infer RestChar}`
  ? LengthOfString<RestChar, [...StrArray, StartChar]>
  : StrArray['length'];

/**
 * @description 取模板字符串中指定的两个字符括住的内容，例取出 {与} 字符括住的内容： `Hello, {name}`，即name
 * @example
 *
 * type Str = `hello, my name is {name}, are you from {country}?`;
 * type TestResult = GetStrTowCharRangeContent<Str, '{', '}'>;
 * // TestResult = "name" | "country"
 */

export type GetStrTowCharRangeContent<
  Str extends string | number,
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

/**
 * @description 取函数的所有参数，将返回数组类型
 * @example
 *
 * const fn = (a: number, b: Record<string, number>) => {};
 *
 * type FnArgs = GetFnArgs<typeof fn>
 * // FnArgs = [a: number, b: Record<string, number>]
 * // FnArgs[0] = number
 * // FnArgs[1] = Record<string, number>
 */
export type GetFnArgs<Fn extends (...args: any[]) => any> = Fn extends (...args: infer Args) => any ? Args : never;

/**
 * @description 选择性的将对象中某些key设为required
 * @example
 *
 * interface Userinfo {
      id?: string;
      key?: number;
      age: number;
      name?: string;
   }
 * type TestResult = PickRequired<Userinfo, 'id' | 'key'>;
   TestResult = {
      id: string;
      key: number;
      age: number;
      name?: string;
    }
 */
// export type PickRequired<T extends object, K extends keyof T> = T & {
//   [P in K]-?: T[P];
// };

// type Invalid<T> = Error & { __errorMessage: T };

// type AsUniqueArray<A extends ReadonlyArray<any>, B extends ReadonlyArray<any>> = {
//   [I in keyof A]: unknown extends {
//     [J in keyof B]: J extends I ? never : B[J] extends A[I] ? unknown : never;
//   }[number]
//     ? Invalid<[A[I], 'is repeated']>
//     : A[I];
// };

// type Narrowable = string | number | boolean | Record<string, any> | null | undefined | symbol;

// const asUniqueArray = <N extends Narrowable, A extends [] | (ReadonlyArray<N> & AsUniqueArray<A, A>)>(a: A) => a;

// asUniqueArray([1, 2]);

// asUniqueArray([1, 2, 2]);
