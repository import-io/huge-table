import React from 'react';
import sd from 'skin-deep';
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

      const tree = sd.shallowRender(React.createElement(UrlCell, {cellData, cellWidth: 250}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.style.width).to.equal(250);

      const aContent = vdom.props.children;

      expect(aContent.props.children.props.children).to.equal('Implement a FuzzyFinder');
      expect(aContent.props.title).to.equal('This question has been arbitrarily awarded 31.807 hotness points');
      expect(aContent.props.href).to.equal('http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder');
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

      const tree = sd.shallowRender(React.createElement(UrlCell, {cellData, cellWidth: 245}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.style.width).to.equal(245);

      const aContent = vdom.props.children;

      expect(aContent.props.children.props.children).to.equal('Implement a FuzzyFinder');
      expect(aContent.props.title).to.equal('Implement a FuzzyFinder');
      expect(aContent.props.href).to.equal('http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder');
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

      const tree = sd.shallowRender(React.createElement(UrlCell, {cellData, cellWidth: 100}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.style.width).to.equal(100);

      const aContent = vdom.props.children;

      expect(aContent.props.children.props.children).to.equal('http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder');
      expect(aContent.props.title).to.equal('http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder');
      expect(aContent.props.href).to.equal('http://codegolf.stackexchange.com/questions/52012/implement-a-fuzzyfinder');
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

      const tree = sd.shallowRender(React.createElement(UrlCell, {cellData, cellWidth: 763}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.style.width).to.equal(763);

      const aContent = vdom.props.children;

      expect(aContent.props.children.props.children).to.be.null;
      expect(aContent.props.title).to.be.null;
      expect(aContent.props.href).to.be.null;
    });
  });
});
