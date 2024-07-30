export function saveToLocalStorage(key: string, query: string) {
  localStorage.setItem(key, query);
}

export function getFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) ?? '';
  }
  return '';
}
