import React from 'react';

import { ImageCell } from './ImageCell';
import { UrlCell } from './UrlCell';
import { TextCell } from './TextCell';
import * as Constants from './constants';
import { CellExpander } from './CellExpander';

export function handleArrayOfData({columnDataType, cellData, width, height, key, columnKey,rowIndex, mixedContentImage, cellCustomRenderer, disableClickEvents}) {
  const childrenCellData = generateChildCellData(cellData);

  const properties = {
    disableClickEvents,
    columnDataType,
    cellData: childrenCellData[0],
    width,
    key,
    columnKey,
    mixedContentImage,
    height,
    rowIndex,
  };

  if (childrenCellData.length === 1) {
    return cellCustomRenderer(properties);
  } else {
    return (
        <CellExpander firstElement={cellCustomRenderer(properties)} totalRows={properties.height} rowIndex={properties.rowIndex}>
        {childrenCellData.map((cellData, key) => cellCustomRenderer({...properties, cellData, key}))}
      </CellExpander>
    );
  }
}

export function getComponentDataType ({
  columnDataType,
  cellData,
  width, height, key, columnKey,
  mixedContentImage,
  cellCustomRenderer = getComponentContent,
  cellStyles,
  disableClickEvents,
  rowIndex}) {
  if (!columnDataType) {
    return null;
  }

  const props = {cellStyles, columnDataType, cellData, key, columnKey, mixedContentImage, width, height,rowIndex, disableClickEvents };// console.log('%cLogging-----props.height in cellutils-              ==', 'color: blue; font-size:16px;', props.rowIndex);

  if (Array.isArray(cellData.main)) {
    return handleArrayOfData({...props, cellCustomRenderer});
  } else {
    return cellCustomRenderer(props);
  }
}

export function getComponentContent({columnDataType, cellData, width, key, columnKey, mixedContentImage, disableClickEvents = false }) { // eslint-disable-line react/no-multi-comp
  switch(columnDataType) {
    case Constants.ColumnTypes.URL:
      return <UrlCell cellData={cellData} width={width} key={key} columnKey={columnKey} disabled={disableClickEvents} />;

    case Constants.ColumnTypes.IMAGE:
      return <ImageCell cellData={cellData} width={width} key={key} disabled={disableClickEvents} columnKey={columnKey} mixedContentImage={mixedContentImage} />;

    case Constants.ColumnTypes.AUTO:
      if (cellData.main && cellData.main.src) {
        return <ImageCell cellData={cellData} width={width} key={key} disabled={disableClickEvents} columnKey={columnKey} mixedContentImage={mixedContentImage} />;
      } else {
        return <TextCell cellData={cellData} width={width} key={key} columnKey={columnKey} />;
      }

    default:
      return <TextCell cellData={cellData} width={width} key={key} columnKey={columnKey} />;
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
