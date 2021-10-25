import { createContext } from 'react';
import { State } from './AppContextProvider';

const context = createContext<undefined | State>(undefined);

export default context;
