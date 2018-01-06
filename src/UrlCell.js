import React from 'react';
import OverflowExpander from './OverflowExpander';
import * as Constants from './constants';
import PropTypes from 'prop-types';

let HORZ_PADDING = 5;
if (Constants.CELL_EXPANDER_SAMELINE) {
  HORZ_PADDING = 5;
}

export const UrlCell = (props) => {
  let content = props.cellData.text || props.cellData.main;
  content = typeof content === 'object' ?  JSON.stringify(content) : content;

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
        disabled
        href={props.disabled ? 'javascript:void(0);' : props.cellData.main}
        title={props.cellData.title || props.cellData.text || props.cellData.main}
        target={'_blank'}
        style={{
          display: 'inline-block',
        }}
      >
        <OverflowExpander availableWidth={props.width - HORZ_PADDING * 2}>{content}</OverflowExpander>
      </a>
    </div>
  );
};

UrlCell.propTypes = {
  cellData: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};
