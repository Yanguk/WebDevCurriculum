/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
export type ArityOneFn = (_arg: any) => any;

export type PickFirstInTuple<T extends any[]> = T extends [arg: infer L]
  ? L
  : () => never;

export type FirstFnParameterType<T extends ArityOneFn[]> = Parameters<
  PickFirstInTuple<T>
>[any];

export type LastFnReturnType<T extends ArityOneFn[]> = T extends [
  ...infer _REST,
  infer LAST extends (..._args: any) => any
]
  ? ReturnType<LAST>
  : never;
