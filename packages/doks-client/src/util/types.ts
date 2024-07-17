// https://stackoverflow.com/questions/48011353/how-to-unwrap-the-type-of-a-promise#49889856
export type Unpromise<T> = T extends PromiseLike<infer U>
  ? U
  : T extends (...args: unknown[]) => PromiseLike<infer V>
  ? V
  : T;
