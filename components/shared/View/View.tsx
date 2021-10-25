import * as React from 'react';

type CardDirection = 'horizontal' | 'vertical';

type ViewProps = {
    children: React.ReactNode;
    cardDirection?: CardDirection;
};

export const View: React.FC<ViewProps> = ({ children, cardDirection = 'horizontal' }) => (
    <div className="view-container">
        <div className={`card ${cardDirection}`}>{children}</div>
    </div>
);
