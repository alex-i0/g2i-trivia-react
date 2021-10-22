import React from 'react';
import { string, oneOf, func } from 'prop-types';

type ButtonProps = {
    children: string;
    size?: 'medium' | 'small';
    type?: 'subtle';
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = React.forwardRef(({ children, size, type, className, onClick }: ButtonProps, ref) => (
    <button className={`button-component --${size} --${type} ${className}`} onClick={onClick} ref={ref}>
        {children}
    </button>
));

Button.propTypes = {
    children: string.isRequired,
    size: oneOf(['medium', 'small']),
    type: oneOf(['subtle']),
    className: string,
    onClick: func
};