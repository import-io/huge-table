import React from 'react';
import { Cell } from 'fixed-data-table-2';

export const HeaderCell = ({cellData, ...props}) => {
  const content = cellData.main;

  const style = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    padding: '0 5px',
  };

  return (
    <Cell {...props}>
      <div style={style} title={content}>{content} </div>
    </Cell>
  );
};

HeaderCell.propTypes = {
  columnKey: React.PropTypes.string.isRequired,
  cellData: React.PropTypes.object.isRequired,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
};
