import React from 'react';
import { Cell } from 'fixed-data-table';

import { ImageCell } from './ImageCell';
import { UrlCell } from './UrlCell';
import { TextCell } from './TextCell';
import * as Constants from './constants';

export function getComponentDataType ({columnDataType, cellData, cellWidth, cellHeight, key, columnKey, mixedContentImage}) {
  if (!columnDataType) {
    return null;
  }

  const cellContent = getComponentContent({columnDataType, cellData, cellWidth, key, columnKey, mixedContentImage});

  return (
    <Cell height={cellHeight} width={cellWidth} columnKey={columnKey}>
      {cellContent}
    </Cell>
  );
}

export function getComponentContent({columnDataType, cellData, cellWidth, key, columnKey, mixedContentImage}) { // eslint-disable-line react/no-multi-comp
  switch(columnDataType) {
    case Constants.ColumnTypes.URL:
      return <UrlCell cellData={cellData} width={cellWidth} key={key} columnKey={columnKey} />;

    case Constants.ColumnTypes.IMAGE:
      return <ImageCell cellData={cellData} width={cellWidth} key={key} columnKey={columnKey} mixedContentImage={mixedContentImage} />;

    default:
      return <TextCell cellData={cellData} width={cellWidth} key={key} columnKey={columnKey} />;
  }
}

export function generateChildCellData (cellData) {
  if (!cellData || !cellData.main) {
    return null;
  }

  const results = [];

  cellData.main.forEach((value, i) => {
    const obj = {};

    Object
      .keys(cellData)
      .forEach((property) => {

        if (Array.isArray(cellData[property])) {
          obj[property] = cellData[property][i];
        } else {
          obj[property] = cellData[property];
        }
      });

    results.push(obj);
  });

  return results;
}
