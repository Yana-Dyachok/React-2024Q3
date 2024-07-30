import '@/index.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import { ThemeProvider } from '../redux/toggle-theme/theme-provider/theme-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
