import React from 'react';
import OverflowExpander from './OverflowExpander';

const HORZ_PADDING = 5;

export const UrlCell = (props) => {
  const content = props.cellData.text || props.cellData.main;
  return (
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
  );
};

UrlCell.propTypes = {
  cellData: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
};
