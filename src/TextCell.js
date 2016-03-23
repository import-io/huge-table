import React from 'react';
import OverflowExpander from './OverflowExpander';

const HORZ_PADDING = 5;

export const TextCell = (props) => {
  let content;

  if (props.cellData.type === 'STRING') {
    content = props.cellData.text || props.cellData.main || '';
    content = typeof content === 'object' ?  JSON.stringify(content) : content;

  } else {
    content = props.cellData.main.text;
    const href = props.cellData.main.href;
    if (href) {
      content = <a href={href} target="_blank">{content}</a>;
    }
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
  cellData: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
};
