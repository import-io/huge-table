import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export const CellExpander = ({children}) => {
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
          position: 'absolute',
          top: '65%',
          left: '75%',
          cursor: 'pointer',
        }}
        className="badge"
      >
        ...
      </span>
    </OverlayTrigger>
  );
};

CellExpander.propTypes = {
  children: React.PropTypes.any,
};
