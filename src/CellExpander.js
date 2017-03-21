import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import * as Constants from './constants';
import { StyleSheet, css } from 'aphrodite';

function getExpanderStyle () {
  const expanderOnSameline = Constants.CELL_EXPANDER_SAMELINE;
  let expanderStyle = {};

  if (expanderOnSameline) {
    // on same line, new functionality
    expanderStyle = StyleSheet.create({
      cellStyle: {
        position: 'absolute',
        top: 'calc(100% - 23px)',
        right: '4px',
        cursor: 'pointer',
        'margin-right': '5px',
        'background-color': '#ccc',
      },
      labelStyle: {
        display: 'inline',
        padding: '.3em .6em .2em',
        'font-size': '75%',
        'font-weight': 'bold',
        'line-height': '1',
        color: '#333333',
        'text-align': 'center',
        'white-space': 'nowrap',
        'vertical-align': 'baseline',
        'border-radius': '.25em',
      },
      cellContentStyle: {
        'margin-left': '0px',
      },
    });
  } else {
    // not on same line (unless too small) - default/old behavior
    expanderStyle = StyleSheet.create({
      cellStyle: {
        position: 'absolute',
        top: 'calc(100% - 23px)',
        left: '4px',
        cursor: 'pointer',
      },
      labelStyle: {
        display: 'inline',
        padding: '.2em .6em .3em',
        'font-size': '75%',
        'font-weight': 'bold',
        'line-height': '1',
        color: '#fff',
        'text-align': 'center',
        'white-space': 'nowrap',
        'vertical-align': 'baseline',
        'border-radius': '.25em',
      },
      cellContentStyle: {
        'margin-left': '0px',
      },
    });
  }

  return (expanderStyle);
};

export const CellExpander = ({firstElement, children}) => {
  const innerText = `+ ${Array.isArray(children) ? children.length-1 : 0} items`;
  const expanderOnSameline = Constants.CELL_EXPANDER_SAMELINE;
  const expanderStyle = getExpanderStyle();

  if (expanderOnSameline) {
    return (
      <div>
        <span className={css(expanderStyle.cellContentStyle)}>
          {firstElement}
        </span>
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
           )}>
          <span className={css(expanderStyle.cellStyle, expanderStyle.labelStyle)}>
            {innerText}
          </span>
        </OverlayTrigger>
      </div>
    );
  } else {
    return (
      <div>
        <span className={css(expanderStyle.cellContentStyle)}>
          {firstElement}
        </span>
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
           )}>
          <span className={css(expanderStyle.cellStyle, expanderStyle.labelStyle)}>
            {innerText}
          </span>
        </OverlayTrigger>
      </div>
    );
  }
};

CellExpander.propTypes = {
  children: React.PropTypes.any,
  expanderOnSameline: React.PropTypes.bool,
};
