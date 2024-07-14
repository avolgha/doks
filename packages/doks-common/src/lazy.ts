export type AsyncLazy<T> = ReturnType<typeof asyncLazy<T>>;

export function asyncLazy<T>(retriever: () => Promise<T>) {
  let value: T | null = null;

  return async () => {
    if (!value) {
      value = await retriever();
    }

    return value;
  };
}
