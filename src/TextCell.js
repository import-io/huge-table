import React from 'react';
import { Cell } from 'fixed-data-table';
import OverflowExpander from './OverflowExpander';

const HORZ_PADDING = 5;

export const TextCell = (props) => {
  const content = props.cellData.text || props.cellData.main || '';

  return (
    <Cell {...props}>
      <div
        className="text-cell"
        style={{
          float: 'left',
          padding: `0 ${HORZ_PADDING}px`,
        }}
      >
        <OverflowExpander availableWidth={props.width - HORZ_PADDING * 2}>{content}</OverflowExpander>
      </div>
    </Cell>
  );
};

TextCell.propTypes = {
  cellData: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  columnKey: React.PropTypes.string.isRequired,
};
