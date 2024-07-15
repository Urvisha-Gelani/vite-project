export const apiUrl = import.meta.env.VITE_API_URL;

export function toCamelCase(str: string) {
  if (!str) return "";
  const title = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const shortTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;
  return shortTitle
}
