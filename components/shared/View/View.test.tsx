import * as React from 'react';
import { shallow } from 'enzyme';
import { CardDirection, View } from './View';

describe('View Component', () => {
    const wrapper = shallow(<View cardDirection={CardDirection.vertical}>Test View</View>);

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Card display is based on prop', () => {
        const viewElement = wrapper.find('.card');

        expect(viewElement.props().className).toContain(CardDirection.vertical);
    });

    it('Default card display is horizontal', () => {
        const wrapper = shallow(<View>Test View</View>);
        const viewElement = wrapper.find('.card');

        expect(viewElement.props().className).toContain(CardDirection.horizontal);
    });

    it('View renders children within card', () => {
        const viewElement = wrapper.find('.card');

        expect(viewElement.text()).toBe('Test View');
    });
});
