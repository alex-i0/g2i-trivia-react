import * as React from 'react';
import styles from './View.module.scss';

type CardDirection = 'horizontal' | 'vertical';

type ViewProps = {
    children: React.ReactNode;
    cardDirection?: CardDirection;
};

export const View: React.FC<ViewProps> = ({ children, cardDirection = 'horizontal' }) => (
    <div className={styles.viewContainer}>
        <div className={`${styles.card} ${styles[cardDirection]}`}>{children}</div>
    </div>
);
