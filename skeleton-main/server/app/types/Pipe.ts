/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
export type ArityFunction = (...args: any) => any;

export type FirstParameters<T extends ArityFunction[]> = T extends [
  infer FIRST extends (...args: any) => any,
  ...infer REST
]
  ? Parameters<FIRST>
  : never;

export type LastParameters<T extends ArityFunction[]> = T extends [
  ...infer REST,
  infer LAST extends (...args: any) => any
]
  ? Parameters<LAST>
  : never;

export type FirstReturnType<T extends ArityFunction[]> = T extends [
  infer FIRST extends (...args: any) => any,
  ...infer REST
]
  ? ReturnType<FIRST>
  : never;

export type LastReturnType<T extends ArityFunction[]> = T extends [
  ...infer REST,
  infer LAST extends (...args: any) => any
]
  ? ReturnType<LAST>
  : never;
