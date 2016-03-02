import React from 'react';
import { Cell } from 'fixed-data-table';

import * as CellUtils from './CellUtils';
import { CellExpander } from './CellExpander';
import * as Constants from './constants';

export const ListCell = ({type, cellData, width, height, columnKey, mixedContentImage}) => {
  const childrenCellData = CellUtils.generateChildCellData(cellData);

  if (childrenCellData.length === 1) {
    return CellUtils.getComponentDataType({
      columnDataType: type,
      cellData: childrenCellData[0],
      cellWidth: width,
      cellHeight: height,
      columnKey,
      mixedContentImage,
    });
  }

  let cellWidth;

  if(type === 'IMAGE') {
    cellWidth = Constants.MIN_COLUMN_WIDTH / childrenCellData.slice(1).length;
  } else {
    cellWidth = width;
  }

  return (
    <Cell height={height} width={width} columnKey={columnKey}>
      {CellUtils.getComponentContent({
        columnDataType: type,
        cellData: childrenCellData[0],
        cellWidth: width,
        columnKey,
        mixedContentImage,
      })}
      <CellExpander>
        {childrenCellData.map((cellData, key) => {
          return CellUtils.getComponentContent({
            columnDataType: type,
            cellData,
            cellWidth,
            key,
            columnKey,
            mixedContentImage,
          });
        })}
      </CellExpander>
    </Cell>
  );
};

ListCell.propTypes = {
  type: React.PropTypes.string.isRequired,
  cellData: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  columnKey: React.PropTypes.string.isRequired,
  mixedContentImage: React.PropTypes.func,
};
