import React      from 'react';
import { HugeTable } from '../../dist';

import schema from './schema';
import data from './data';

require('../../dist/HugeTable.css');
require('../../node_modules/bootstrap/less/bootstrap.less');

function proxyImages (imageUrl) {
  // Just return falsy image urls.
  // If it already is served through https, there is no point in proxying.
  if(!imageUrl || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return `https://images.weserv.nl/?url=${imageUrl.replace('http://', '')}`;
}

const mountNode = document.getElementById('main');

const options = {
  height: 400,
  width: 600,
  mixedContentImage: proxyImages,
};

React.render(<HugeTable data={data.results} schema={schema} options={options} />, mountNode);
