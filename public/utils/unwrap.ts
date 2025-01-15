export const unwrap = <T>(x: T): NonNullable<T> => {
  if (x === null || x === undefined) {
    throw new Error('Unwrapped null or undefined');
  }

  return x;
};
