export function filterProperties<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const filteredObject: Pick<T, K> = {} as Pick<T, K>;

  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      filteredObject[key] = obj[key];
    }
  });

  return filteredObject;
}
