import { createContext } from 'react';
import { Theme, darkTheme } from './theme';

const ThemeContext = createContext<Theme>(darkTheme);

export default ThemeContext;
