import React from 'react';

import { ImageCell } from './ImageCell';
import { UrlCell } from './UrlCell';
import { TextCell } from './TextCell';
import * as Constants from './constants';

export function getComponentDataType (columnDataType, cellData, cellWidth, cellHeight, key, columnKey, mixedContentImage) {
  if (!columnDataType) {
    return null;
  }

  switch(columnDataType) {
    case Constants.ColumnTypes.URL:
      return <UrlCell cellData={cellData} width={cellWidth} height={cellHeight} key={key} columnKey={columnKey} />;

    case Constants.ColumnTypes.IMAGE:
      return <ImageCell cellData={cellData} width={cellWidth} height={cellHeight} key={key} columnKey={columnKey} mixedContentImage={mixedContentImage} />;

    default:
      return <TextCell cellData={cellData} width={cellWidth} height={cellHeight} key={key} columnKey={columnKey} />;
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
