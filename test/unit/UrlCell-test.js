import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { UrlCell } from '../../src/UrlCell';

describe('UrlCell', () => {
  describe('render', () => {
    it('should render a div and an anchor feeded with main, title & text properties', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: 'http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder',
        source: null,
        text: 'Implement a FuzzyFinder',
        title: 'This question has been arbitrarily awarded 31.807 hotness points',
        utc: null,
      };

      const wrapper = shallow(<UrlCell cellData={cellData} width={250} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(250);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
      expect(wrapper.find('.url-cell').length).to.equal(1);
      expect(wrapper.find('.url-cell-content').find('OverflowExpander').props().children).to.equal(cellData.text);
      expect(wrapper.find('.url-cell-content').props().title).to.equal(cellData.title);
      expect(wrapper.find('.url-cell-content').props().href).to.equal(cellData.main);
    });

    it('should render a div and an anchor feeded with main & text properties', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: 'http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder',
        source: null,
        text: 'Implement a FuzzyFinder',
        title: null,
        utc: null,
      };

      const wrapper = shallow(<UrlCell cellData={cellData} width={245} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(245);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
      expect(wrapper.find('.url-cell').length).to.equal(1);
      expect(wrapper.find('.url-cell-content').find('OverflowExpander').props().children).to.equal(cellData.text);
      expect(wrapper.find('.url-cell-content').props().title).to.equal(cellData.text);
      expect(wrapper.find('.url-cell-content').props().href).to.equal(cellData.main);
    });

    it('should render a div and an anchor feeded with only main property', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: 'http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder',
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const wrapper = shallow(<UrlCell cellData={cellData} width={100} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(100);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
      expect(wrapper.find('.url-cell').length).to.equal(1);
      expect(wrapper.find('.url-cell-content').find('OverflowExpander').props().children).to.equal(cellData.main);
      expect(wrapper.find('.url-cell-content').props().title).to.equal(cellData.main);
      expect(wrapper.find('.url-cell-content').props().href).to.equal(cellData.main);
    });

    it('should render a div and an anchor feeded with empty properties', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: null,
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const wrapper = shallow(<UrlCell cellData={cellData} width={763} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(763);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
      expect(wrapper.find('.url-cell').length).to.equal(1);
      expect(wrapper.find('.url-cell-content').find('OverflowExpander').props().children).to.be.null;
      expect(wrapper.find('.url-cell-content').props().title).to.be.null;
      expect(wrapper.find('.url-cell-content').props().href).to.be.null;
    });
  });
});
