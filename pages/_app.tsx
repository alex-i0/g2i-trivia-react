import '../scss/main.scss';
import Provider from '../context/AppContextProvider';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
    <Provider>
        <Component {...pageProps} />
    </Provider>
);

export default App;
