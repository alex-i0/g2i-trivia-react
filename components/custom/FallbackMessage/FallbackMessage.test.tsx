import * as React from 'react';
import { shallow } from 'enzyme';
import { FallbackMessage } from './FallbackMessage';
import { Routes } from '../../../types/navigation';

describe('FallbackMessage Component', () => {
    const wrapper = shallow(<FallbackMessage />);

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Has a vertical card orientation', () => {
        const cardElement = wrapper.find('.game-container').parent();

        expect(cardElement.props().cardDirection).toBe('vertical');
    });

    it('Button redirects to the home page', () => {
        const buttonElement = wrapper.find('div').children().last();

        expect(buttonElement.props().href).toBe(Routes.home);
    });
});
