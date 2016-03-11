import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { HeaderCell } from '../../src/HeaderCell';

describe('HeaderCell', () => {
  describe('render', () => {
    it('should render a div with label property as textContent', () => {
      const wrapper = shallow(<HeaderCell cellData={{main: 'YOLO'}} width={249} height={300} columnKey="someKey" />);

      expect(wrapper.props().width).to.equal(249);
      expect(wrapper.props().height).to.equal(300);
      expect(wrapper.props().columnKey).to.equal('someKey');
      expect(wrapper.find('div[title="YOLO"]').length).to.equal(1);
      expect(wrapper.find('div[title="YOLO"]').text()).to.equal('YOLO');
    });
  });
});
