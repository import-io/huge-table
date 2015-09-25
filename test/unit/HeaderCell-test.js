import React from 'react';
import sd from 'skin-deep';
import { expect } from 'chai';

import { HeaderCell } from '../../src/HeaderCell';

describe('HeaderCell', () => {
  describe('render', () => {
    it('should render a div with label property as textContent', () => {
      const tree = sd.shallowRender(React.createElement(HeaderCell, {label: 'YOLO', cellWidth: 249}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.children).to.equal('YOLO');
      expect(vdom.props.title).to.equal('YOLO');
      expect(vdom.props.style.width).to.equal(249);
    });

    it('should render an empty div', () => {
      const tree = sd.shallowRender(React.createElement(HeaderCell, {label: 'Fuuuuuu', cellWidth: 249}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('div');
      expect(vdom.props.children).to.equal('Fuuuuuu');
      expect(vdom.props.title).to.equal('Fuuuuuu');
      expect(vdom.props.style.width).to.equal(249);
    });
  });
});
