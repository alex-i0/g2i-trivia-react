import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    afterEach(cleanup);

    it('renders a button', () => {
        //Arrange
        render(<Button size="small">Test Button</Button>);
        const button = screen.getByRole('button');

        //Assert
        expect(button).toBeInTheDocument();
    });

    it('button displays given text', () => {
        //Arrange
        const { queryByText, rerender } = render(<Button size="small">Test Button</Button>);

        //Assert
        expect(queryByText('Test Button')).toBeTruthy();

        rerender(<Button>Retest Button</Button>);
        expect(queryByText('Retest Button')).toBeTruthy();
    });

    it('calls correct function on click', () => {
        //Arrange
        const onClick = jest.fn();
        const { getByRole } = render(<Button onClick={onClick}>OnClick</Button>);

        //Act
        fireEvent.click(getByRole('button'));

        //Assert
        expect(onClick).toHaveBeenCalled();
    });
});
