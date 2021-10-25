import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';

type Size = 'medium' | 'small';
type ButtonType = 'subtle' | 'primary';

interface Props extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    size?: Size;
    buttonType?: ButtonType;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
    ({ size = 'medium', buttonType = 'primary', className, children, ...props }, ref) => (
        <button {...props} className={`${styles.buttonComponent} ${styles[size]} ${styles[buttonType]} ${className}`} ref={ref}>
            {children}
        </button>
    )
);
