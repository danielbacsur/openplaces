export function photo(url: string, size = 84): string {
  return `${url}=w${size * 2}-h${size * 2}-p-k-no`;
}
