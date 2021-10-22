import '../scss/main.scss';
import type { AppProps } from 'next/app';
import { Provider } from '../context/AppContext';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider>
            <Component {...pageProps} />
        </Provider>
    );
};
export default App;
