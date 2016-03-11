import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export const CellExpander = ({firstElement, children}) => {
  return (
    <div>
      {firstElement}
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
            top: 'calc(100% - 25px)',
            left: 'calc(100% - 30px)',
            cursor: 'pointer',
          }}
          className="badge"
        >
          ...
        </span>
      </OverlayTrigger>
    </div>
  );
};

CellExpander.propTypes = {
  children: React.PropTypes.any,
};
