export function filterObject<
  T extends object,
  E extends keyof T,
  R = Omit<T, E>
>({ original, exclude }: { original: T; exclude: E }): R {
  const filteredKeys = Object.keys(original).filter((key) => key !== exclude);

  return Object.assign(
    {},
    ...filteredKeys.map((key) => ({
      [key]: (original as Record<string, unknown>)[key],
    }))
  );
}
