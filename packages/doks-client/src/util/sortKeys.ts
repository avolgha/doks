export const sortKeys = (object: Record<string, unknown>) =>
  Object.keys(object).sort((a, b) => {
    const isADirectory = typeof object[a] === "object";
    const isBDirectory = typeof object[b] === "object";

    if (isADirectory && !isBDirectory) {
      return -1;
    } else if (!isADirectory && isBDirectory) {
      return 1;
    }

    return a.localeCompare(b);
  });
