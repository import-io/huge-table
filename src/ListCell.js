import React            from 'react';
import * as CellUtils   from './CellUtils';
import { CellExpander } from './CellExpander';
import * as Constants   from './constants';

export class ListCell extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    cellData: React.PropTypes.object.isRequired,
    cellWidth: React.PropTypes.number.isRequired,
    mixedContentImage: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const childrenCellData = CellUtils.generateChildCellData(this.props.cellData);

    if (childrenCellData.length === 1) {
      return (
        <div
          className="list-cell-wrapper"
        >
          {CellUtils.getComponentDataType(this.props.type, childrenCellData[0], this.props.cellWidth, undefined, this.props.mixedContentImage)}
        </div>
      );
    }

    if(this.props.type === 'IMAGE') {
      const popoverImageWidth = Constants.MIN_COLUMN_WIDTH / childrenCellData.slice(1).length;

      return (
        <div
          className="list-cell-wrapper"
        >
          {CellUtils.getComponentDataType(this.props.type, childrenCellData[0], this.props.cellWidth - Constants.CELL_EXPANDER_WIDTH, undefined, this.props.mixedContentImage)}
          <CellExpander shouldFloatRight>
            {childrenCellData.map((cellData, key) => {
              return CellUtils.getComponentDataType(this.props.type, cellData, popoverImageWidth, key, this.props.mixedContentImage);
            })}
          </CellExpander>
        </div>
      );
    } else {
      return (
        <div
          className="list-cell-wrapper"
        >
          {CellUtils.getComponentDataType(this.props.type, childrenCellData[0], this.props.cellWidth, undefined, this.props.mixedContentImage)}
          <CellExpander>
            {childrenCellData.map((cellData, key) => {
              return CellUtils.getComponentDataType(this.props.type, cellData, Constants.MIN_COLUMN_WIDTH, key);
            })}
          </CellExpander>
        </div>
      );
    }
  }
}
