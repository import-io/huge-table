import React from 'react';
import sd from 'skin-deep';
import { expect } from 'chai';

import { ImageCell } from '../../src/ImageCell';

describe('ImageCell', () => {
  describe('render', () => {
    it('should render an anchor and a div with main & alt properties', () => {

      const cellData = {
        alt: 'Mathematics',
        currency: null,
        main: 'https://cdn.sstatic.net/math/img/icon-48.png',
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const tree = sd.shallowRender(React.createElement(ImageCell, {cellData, cellWidth: 452}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('a');
      expect(vdom.props.href).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
      expect(vdom.props.title).to.equal('Mathematics');

      const div = vdom.props.children[0];

      expect(div.props.style.backgroundImage).to.equal('url(https://cdn.sstatic.net/math/img/icon-48.png)');
    });

    it('should render an anchor and a div with only main property', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: 'https://cdn.sstatic.net/math/img/icon-48.png',
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const tree = sd.shallowRender(React.createElement(ImageCell, {cellData, cellWidth: 632}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('a');
      expect(vdom.props.href).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
      expect(vdom.props.title).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');

      const div = vdom.props.children[0];

      expect(div.props.style.backgroundImage).to.equal('url(https://cdn.sstatic.net/math/img/icon-48.png)');
    });

    it('should render an anchor and a div with only main property and proxified image', () => {
      function proxyImages (imageUrl) {
        // Just return falsy image urls.
        // If it already is served through https, there is no point in proxying.
        if(!imageUrl || imageUrl.startsWith('https://')) {
          return imageUrl;
        }

        return `https://images.weserv.nl/?url=${imageUrl.replace('http://', '')}`;
      }

      const cellData = {
        alt: null,
        currency: null,
        main: 'http://cdn.sstatic.net/math/img/icon-48.png',
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const tree = sd.shallowRender(React.createElement(ImageCell, {cellData, cellWidth: 100, mixedContentImage: proxyImages}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('a');
      expect(vdom.props.href).to.equal('http://cdn.sstatic.net/math/img/icon-48.png');
      expect(vdom.props.title).to.equal('http://cdn.sstatic.net/math/img/icon-48.png');

      const div = vdom.props.children[0];

      expect(div.props.style.backgroundImage).to.equal('url(https://images.weserv.nl/?url=cdn.sstatic.net/math/img/icon-48.png)');
    });

    it('should render an anchor and a div with empty properties', () => {

      const cellData = {
        alt: null,
        currency: null,
        main: null,
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const tree = sd.shallowRender(React.createElement(ImageCell, {cellData, cellWidth: 763}));
      const vdom = tree.getRenderOutput();

      expect(vdom.type).to.equal('a');
      expect(vdom.props.href).to.be.null;
      expect(vdom.props.title).to.be.null;

      const div = vdom.props.children[0];

      expect(div.props.style.backgroundImage).to.be.null;
    });
  });
});
