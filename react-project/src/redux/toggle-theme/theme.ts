export const lightTheme = 'lightTheme' as const;
export const darkTheme = 'darkTheme' as const;

export type Theme = typeof lightTheme | typeof darkTheme;
