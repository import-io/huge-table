import React from 'react';
import sd from 'skin-deep';
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

      const tree = sd.shallowRender(React.createElement(TextCell, {cellData, cellWidth: 250}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.children.props.children).to.equal('2 answers');
      expect(vdom.props.style.width).to.equal(250);
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

      const tree = sd.shallowRender(React.createElement(TextCell, {cellData, cellWidth: 249}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.children.props.children).to.equal('13 hours ago');
      expect(vdom.props.style.width).to.equal(249);
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

      const tree = sd.shallowRender(React.createElement(TextCell, {cellData, cellWidth: 100}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.children.props.children).to.equal('');
      expect(vdom.props.style.width).to.equal(100);
    });
  });
});
