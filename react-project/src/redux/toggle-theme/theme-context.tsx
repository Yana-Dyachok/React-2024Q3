import { createContext } from 'react';
import { Theme, darkTheme, lightTheme } from './theme';

const ThemeContext = createContext<Theme>(lightTheme || darkTheme);

export default ThemeContext;
