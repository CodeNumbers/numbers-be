export function isValidQuery<T extends Record<string, string>>(
  query: string,
  keyword: T,
) {
  return keyword[query];
}
