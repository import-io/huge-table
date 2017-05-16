import React from 'react';
import OverflowExpander from './OverflowExpander';
import PropTypes from 'prop-types';

const HORZ_PADDING = 6;

export const TextCell = (props) => {
  let content;

  if (props.cellData.type === 'TEXT') {
    if (!props.cellData.main) {
      content = '';
    } else {
      content = props.cellData.main.text;
      const href = props.cellData.main.href;
      if (href) {
        content = <a href={href} target="_blank">{content}</a>;
      }
    }

  } else {
    content = props.cellData.text || props.cellData.main || '';
    content = typeof content === 'object' ?  JSON.stringify(content) : content;
  }

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
  cellData: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};
