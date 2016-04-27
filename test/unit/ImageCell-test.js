import React from 'react';
import { shallow } from 'enzyme';
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

      const wrapper = shallow(<ImageCell cellData={cellData} width={452}/>);

      expect(wrapper.find('a').length).to.equal(1);
      expect(wrapper.find('a').props().href).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
      expect(wrapper.find('a').props().title).to.equal('Mathematics');
      expect(wrapper.find('.example-image').props().src).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
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

      const wrapper = shallow(<ImageCell cellData={cellData} width={632} />);

      expect(wrapper.find('a').length).to.equal(1);
      expect(wrapper.find('a').props().href).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
      expect(wrapper.find('a').props().title).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
      expect(wrapper.find('.example-image').props().src).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
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

      const wrapper = shallow(<ImageCell cellData={cellData} width={100} mixedContentImage={proxyImages} />);

      expect(wrapper.find('a').length).to.equal(1);
      expect(wrapper.find('a').props().href).to.equal('http://cdn.sstatic.net/math/img/icon-48.png');
      expect(wrapper.find('a').props().title).to.equal('http://cdn.sstatic.net/math/img/icon-48.png');
      expect(wrapper.find('.example-image').props().src).to.equal('https://images.weserv.nl/?url=cdn.sstatic.net/math/img/icon-48.png');
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

      const wrapper = shallow(<ImageCell cellData={cellData} width={763} />);

      expect(wrapper.find('a').length).to.equal(1);
      expect(wrapper.find('a').props().href).to.be.null;
      expect(wrapper.find('a').props().title).to.be.null;
      expect(wrapper.find('.example-image').props().src).to.be.null;
    });

    it('should render and image when passed in a object', () => {

      const cellData = {
        alt: 'Mathematics',
        currency: null,
        main: {
          src: 'https://cdn.sstatic.net/math/img/icon-48.png',
        },
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const wrapper = shallow(<ImageCell cellData={cellData} width={452}/>);

      expect(wrapper.find('a').length).to.equal(1);
      expect(wrapper.find('a').props().href).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
      expect(wrapper.find('a').props().title).to.equal('Mathematics');
      expect(wrapper.find('.example-image').props().src).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
    });

    it('should render and image and link when passed in a object', () => {

      const cellData = {
        alt: 'Mathematics',
        currency: null,
        main: {
          src: 'https://cdn.sstatic.net/math/img/icon-48.png',
          href: 'https://duckduckgo.com',
        },
        source: null,
        text: null,
        title: null,
        utc: null,
      };

      const wrapper = shallow(<ImageCell cellData={cellData} width={452}/>);

      expect(wrapper.find('a').length).to.equal(1);
      expect(wrapper.find('a').props().href).to.equal('https://duckduckgo.com');
      expect(wrapper.find('a').props().title).to.equal('Mathematics');
      expect(wrapper.find('.example-image').props().src).to.equal('https://cdn.sstatic.net/math/img/icon-48.png');
    });



  });
});
