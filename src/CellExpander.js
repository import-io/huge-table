import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export const CellExpander = ({firstElement, children}) => {
  const innerText = `+ ${Array.isArray(children) ? children.length-1 : 0} more items`;

  return (
    <div>
      {firstElement}
      <OverlayTrigger
         rootClose
         trigger="click"
         placement="top"
         overlay={(
           <Popover id="details-popover">
             {children.map((c, id) => (
               <div key={id}>
                 {c}
                 <br/>
               </div>
             ))}
           </Popover>
         )}
      >
        <span
          style={{
            position: 'absolute',
            top: 'calc(100% - 25px)',
            left: 'calc(100% - 95px)',
            cursor: 'pointer',
          }}
          className="label label-outline"
        >
          {innerText}
        </span>
      </OverlayTrigger>
    </div>
  );
};

CellExpander.propTypes = {
  children: React.PropTypes.any,
};
