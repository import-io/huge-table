import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { TextCell } from '../../src/TextCell';

describe('TextCell', () => {
  describe('render', () => {
    it('should render a div with main property as textContent', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: '2 answers',
        source: null,
        text: null,
        title: null,
        utc: null,
        type: 'STRING',
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={250} />);

      expect(wrapper.find('.text-cell').length).to.equal(1);
      expect(wrapper.find('OverflowExpander').props().children).to.equal(cellData.main);
    });

    it('should render a div with text property as textContent', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: null,
        source: null,
        text: '13 hours ago',
        title: null,
        utc: null,
        type: 'STRING',
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={249}/>);

      expect(wrapper.find('.text-cell').length).to.equal(1);
      expect(wrapper.find('OverflowExpander').props().children).to.equal(cellData.text);
    });

    it('should render an empty div', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: null,
        source: null,
        text: null,
        title: null,
        utc: null,
        type: 'STRING',
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={100} />);

      expect(wrapper.find('.text-cell').length).to.equal(1);
      expect(wrapper.find('OverflowExpander').props().children).to.equal('');
    });


    it('should render content of type TEXT', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: {
          text: '2 answers',
        },
        source: null,
        text: null,
        title: null,
        utc: null,
        type: 'TEXT',
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={250} />);

      expect(wrapper.find('.text-cell').length).to.equal(1);
      expect(wrapper.find('a').length).to.equal(0);
      expect(wrapper.find('OverflowExpander').props().children).to.equal(cellData.main.text);
    });

    it('should render content of type TEXT as a link when it has href property', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: {
          text: '2 answers',
          href: 'https://duckduckgo.com',
        },
        source: null,
        text: null,
        title: null,
        utc: null,
        type: 'TEXT',
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={250} />);

      expect(wrapper.find('.text-cell').length).to.equal(1);
      expect(wrapper.find('a').length).to.equal(1);
      expect(wrapper.find('a').props().children).to.equal(cellData.main.text);
    });

    it('should attempt to render content of any type without erroring', () => {

      const cellData = {
        main: 1,
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={250} />);
      expect(wrapper.find('.text-cell').length).to.equal(1);
    });

    it('should handle undefined values of type STRING', () => {

      const cellData = {
        main: undefined,
        type: 'STRING',
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={250} />);
      expect(wrapper.find('.text-cell').length).to.equal(1);
    });

    it('should handle undefined values of type TEXT', () => {

      const cellData = {
        main: undefined,
        type: 'TEXT',
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={250} />);
      expect(wrapper.find('.text-cell').length).to.equal(1);
    });

  });
});
