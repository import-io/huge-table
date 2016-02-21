import React            from 'react';
import * as CellUtils   from './CellUtils';
import { CellExpander } from './CellExpander';
import * as Constants   from './constants';

export const ListCell = ({type, cellData, width, height, columnKey, mixedContentImage}) => {
  const childrenCellData = CellUtils.generateChildCellData(cellData);

  if (childrenCellData.length === 1) {
    return (
      <div
        className="list-cell-wrapper"
      >
        {CellUtils.getComponentDataType(type, childrenCellData[0], width, height, undefined, columnKey, mixedContentImage)}
      </div>
    );
  }

  if(type === 'IMAGE') {
    const popoverImageWidth = Constants.MIN_COLUMN_WIDTH / childrenCellData.slice(1).length;

    return (
      <div
        className="list-cell-wrapper"
      >
        {CellUtils.getComponentDataType(type, childrenCellData[0], width - Constants.CELL_EXPANDER_WIDTH, height, undefined, columnKey, mixedContentImage)}
        <CellExpander shouldFloatRight>
          {childrenCellData.map((cellData, key) => {
            return CellUtils.getComponentDataType(type, cellData, popoverImageWidth, height, key, columnKey, mixedContentImage);
          })}
        </CellExpander>
      </div>
    );
  } else {
    return (
      <div
        className="list-cell-wrapper"
      >
        {CellUtils.getComponentDataType(type, childrenCellData[0], width, height, undefined, columnKey, mixedContentImage)}
        <CellExpander>
          {childrenCellData.map((cellData, key) => {
            return CellUtils.getComponentDataType(type, cellData, Constants.MIN_COLUMN_WIDTH, height, key, columnKey);
          })}
        </CellExpander>
      </div>
    );
  }
};

ListCell.propTypes = {
  type: React.PropTypes.string.isRequired,
  cellData: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  columnKey: React.PropTypes.string.isRequired,
  mixedContentImage: React.PropTypes.func,
};
