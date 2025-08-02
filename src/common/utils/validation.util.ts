export function isValidQuery<T extends Record<string, string>>(
  query: string,
  keyword: T,
) {
  return Object.values(keyword).includes(query);
}
