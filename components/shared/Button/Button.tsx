import { ButtonHTMLAttributes, forwardRef } from 'react';

type Size = 'medium' | 'small';

interface Props extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    size?: Size;
    buttonType?: 'subtle';
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ size, buttonType, className, children, ...props }, ref) => (
    <button {...props} className={`button-component --${size} --${buttonType} ${className}`} ref={ref}>
        {children}
    </button>
));
