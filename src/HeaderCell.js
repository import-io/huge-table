import React from 'react';
import { Cell } from 'fixed-data-table';

export const HeaderCell = ({textValue, ...props}) => {
  const style = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    padding: '0 5px',
  };

  return (
    <Cell {...props}>
      <div style={style} title={textValue}>{textValue}</div>
    </Cell>
  );
};

HeaderCell.propTypes = {
  columnKey: React.PropTypes.string.isRequired,
  textValue: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
};
