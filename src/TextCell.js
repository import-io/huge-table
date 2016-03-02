import React from 'react';
import OverflowExpander from './OverflowExpander';

const HORZ_PADDING = 5;

export const TextCell = (props) => {
  const content = props.cellData.text || props.cellData.main || '';

  return (
    <div
      className="text-cell"
      style={{
        float: 'left',
        padding: `0 ${HORZ_PADDING}px`,
      }}
    >
      <OverflowExpander availableWidth={props.width - HORZ_PADDING * 2}>{content}</OverflowExpander>
    </div>
  );
};

TextCell.propTypes = {
  cellData: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
};
