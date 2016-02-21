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
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={250} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(250);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
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
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={249} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(249);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
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
      };

      const wrapper = shallow(<TextCell cellData={cellData} width={100} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(100);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
      expect(wrapper.find('.text-cell').length).to.equal(1);
      expect(wrapper.find('OverflowExpander').props().children).to.equal('');
    });
  });
});
