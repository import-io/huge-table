import React from 'react';
import { render } from 'react-dom';
import { HugeTable } from '../src';

import schema from './schema';
import data from './data';

import '../src/HugeTable.less';
import '../node_modules/bootstrap/less/bootstrap.less';

function proxyImages (imageUrl) {
  // Just return falsy image urls.
  // If it already is served through https, there is no point in proxying.
  if(!imageUrl || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return `https://images.weserv.nl/?url=${imageUrl.replace('http://', '')}`;
}

const mountNode = document.getElementById('main');

const onSchemaChangeCallback = () => {
  console.debug('Schema changed!', schema);
};

const options = {
  height: 400,
  width: 600,
  mixedContentImage: proxyImages,
  id: '1',
};

render(<HugeTable data={data.results} schema={schema} options={options} onSchemaChange={onSchemaChangeCallback} />, mountNode);

// Rendereres example.

const mountNode2 = document.getElementById('main2');
const options2 = {
  height: 800,
  width: 1200,
  mixedContentImage: proxyImages,
  id: '2',
};
const renderers = {
  HEADER(properties) {
    // properties object might include following properties:
    // `cellData`          - REQUIRED - Object containing possible values of data that the cell can render.
    //                                  It should have at least the 'main' key but other values like `_text`,
    //                                  '_url' '_src' are possible. Those are dependant on the cell type.
    // `width`             - REQUIRED - The width that the cell will have. It is an informational value, can't be changed.
    //                                  The table is managing cell width and height because of column resizing ability.
    // `height`            - REQUIRED - Same as above, just for cell height.
    // `columnKey`         - REQUIRED - Name of th column key. Informational info.
    // `key`               - OPTIONAL - If a cell is rendered as part of array of values, it will have a custom key
    //                                  that should be rendered on the cell, to satisfy React's rendering of lists of data.
    // `columnDataType`    - OPTIONAL - Defines the type of column. The same as the the key in the `renderers` object.
    // `mixedContentImage` - OPTIONAL - The same function that was passed to the `huge-table` props options.
    //
    return <div>H: {properties.cellData.main}</div>;
  },
};

render(<HugeTable data={data.results} schema={schema} options={options2} renderers={renderers} onSchemaChange={onSchemaChangeCallback} resizeByCharCount />, mountNode2);
