import { useContext } from 'react';
import AppContext from './AppContext';

export const useAppContext = () => {
    const appContext = useContext(AppContext);

    if (!appContext) throw new Error('Context used outside of Provider');

    return appContext;
};
