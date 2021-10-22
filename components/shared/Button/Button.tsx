import React from 'react';

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
