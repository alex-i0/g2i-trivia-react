import '../scss/main.scss';
import type { AppProps } from 'next/app';
import { Provider } from '../context/AppContext';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
    <Provider>
        <Component {...pageProps} />
    </Provider>
);

export default App;
