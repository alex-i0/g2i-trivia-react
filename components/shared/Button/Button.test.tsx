import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

describe('Button Component', () => {
    const wrapper = shallow(
        <Button size="small" buttonType="subtle" className="test-button">
            Test
        </Button>
    );

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Button recives proper Props', () => {
        const buttonElement = wrapper.find('button');

        expect(buttonElement.props().children).toBe('Test');
        expect(buttonElement.props().className).toContain('--small --subtle test-button');
    });

    it('Button display texts correctly', () => {
        const buttonElement = wrapper.find('button');

        expect(buttonElement.text()).toBe('Test');
    });
});
