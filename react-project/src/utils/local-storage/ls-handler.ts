export function saveToLocalStorage(key: string, query: string) {
  localStorage.setItem(key, query);
}

export function getFromLocalStorage(key: string) {
  const query = localStorage.getItem(key);
  return query ?? '';
}
