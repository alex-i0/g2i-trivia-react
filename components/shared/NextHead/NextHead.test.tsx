import * as React from 'react';
import { shallow } from 'enzyme';
import { NextHead } from './NextHead';

describe('NextHead Component', () => {
    const wrapper = shallow(<NextHead title="Test Title" />);

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Displays title based on prop', () => {
        const titleElement = wrapper.find('title');

        expect(titleElement.children().contains('Trivia | Test Title')).toBe(true);
        expect(titleElement).toBeDefined();
    });

    it('Has imported favivon', () => {
        const linkElement = wrapper.find('link');

        expect(linkElement.props().rel).toBe('icon');
        expect(linkElement.props().href).toBe('/favicon.ico');
    });

    it('Has defined metatags', () => {
        const titleElement = wrapper.find('meta');

        expect(titleElement.length).toEqual(8);
    });
});
