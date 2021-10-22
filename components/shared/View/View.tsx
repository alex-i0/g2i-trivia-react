import { oneOf, node } from 'prop-types';

export enum CardDirection {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

type ViewProps = {
    children: React.ReactNode;
    cardDirection?: CardDirection;
};

export const View: React.FC<ViewProps> = ({ children, cardDirection = CardDirection.horizontal }) => (
    <div className="view-container">
        <div className={`card ${cardDirection}`}>{children}</div>
    </div>
);

View.propTypes = {
    children: node.isRequired,
    cardDirection: oneOf([CardDirection.horizontal, CardDirection.vertical])
};
