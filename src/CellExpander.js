import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export const CellExpander = ({shouldFloatRight = false, children}) => {
  return (
    <OverlayTrigger
       rootClose
       trigger="click"
       placement="top"
       overlay={(
         <Popover id="details-popover">
           {children}
         </Popover>
       )}
    >
      <span
        style={{
          margin: '10px 5px',
          float: shouldFloatRight ? 'right' : undefined,
        }}
        className="badge"
      >
        ...
      </span>
    </OverlayTrigger>
  );
};

CellExpander.propTypes = {
  shouldFloatRight: React.PropTypes.bool,
  children: React.PropTypes.any,
};
