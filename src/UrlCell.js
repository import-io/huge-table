import React from 'react';
import { Cell } from 'fixed-data-table';
import OverflowExpander from './OverflowExpander';

const HORZ_PADDING = 5;

export const UrlCell = (props) => {
  const content = props.cellData.text || props.cellData.main;
  return (
    <Cell {...props}>
      <div
        className="url-cell"
        style={{
          float: 'left',
          padding: `0 ${HORZ_PADDING}px`,
        }}
      >
        <a
          className="url-cell-content"
          href={props.cellData.main}
          title={props.cellData.title || props.cellData.text || props.cellData.main}
          target={'_blank'}
        >
          <OverflowExpander availableWidth={props.width - HORZ_PADDING * 2}>{content}</OverflowExpander>
        </a>
      </div>
    </Cell>
  );
};

UrlCell.propTypes = {
  cellData: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  columnKey: React.PropTypes.string.isRequired,
};
