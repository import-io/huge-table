import React from 'react';
import { Cell } from 'fixed-data-table-2';
import PropTypes from 'prop-types';

export const HeaderCell = ({cellData}) => {
  const content = cellData.main;

  const style = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    padding: '0 5px',
  };

  return (
    <Cell>
      <div style={style} title={content}>{content} </div>
    </Cell>
  );
};

HeaderCell.propTypes = {
  columnKey: PropTypes.string.isRequired,
  cellData: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
