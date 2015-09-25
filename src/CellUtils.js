import React          from 'react';
import { ImageCell }  from './ImageCell';
import { UrlCell }    from './UrlCell';
import { TextCell }   from './TextCell';
import * as Constants from './constants';

export function getComponentDataType (columnDataType, cellData, cellWidth, key, mixedContentImage) {
  if (!columnDataType) {
    return null;
  }

  switch(columnDataType) {
    case Constants.ColumnTypes.URL:
      return <UrlCell cellData={cellData} cellWidth={cellWidth} key={key} />;

    case Constants.ColumnTypes.IMAGE:
      return <ImageCell cellData={cellData} cellWidth={cellWidth} key={key} mixedContentImage={mixedContentImage} />;

    default:
      return <TextCell cellData={cellData} cellWidth={cellWidth} key={key} />;
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
