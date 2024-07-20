export const lightTheme = {
  backgroundColor: 'var(--c-white)',
  color: 'var(--c-blue-700)',
};

export const darkTheme = {
  backgroundColor: 'var(--c-green-900)',
  color: 'var(--c-white)',
};

export type Theme = typeof lightTheme | typeof darkTheme;
