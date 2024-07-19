/* eslint-disable @typescript-eslint/no-explicit-any */
export const apiUrl = import.meta.env.VITE_API_URL;

export function toCamelCase(str: string) {
  if (!str) return "";
  const title = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const shortTitle = title.length > 30 ? `${title.slice(0, 30)}...` : title;
  return shortTitle;
}
export const savePostsToLocalStorage = (posts: any) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const getPostsFromLocalStorage = () => {
  const posts = localStorage.getItem("posts");
  return posts ? JSON.parse(posts) : [];
};