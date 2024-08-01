import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../redux/store/store';
import { ThemeProvider } from '../theme-context/theme-provider';
import '../index.css';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
