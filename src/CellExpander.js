import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import * as Constants   from './constants';

export class CellExpander extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
  }

  constructor(props) {
    super(props);

    this.renderPopover = this.renderPopover.bind(this);
  }

  renderPopover() {
    return (
      <Popover>
        {this.props.children}
      </Popover>
    );
  }

  render() {
    const height  = 13;
    const top     = (Constants.ROW_HEIGHT - (height / 2)) / 2;

    return (
      <OverlayTrigger
         rootClose
         trigger="click"
         placement="top"
         overlay={this.renderPopover()}
      >
        <span
          style={{
            display: 'inline-block',
            height,
            padding: '0 5px',
            fontSize: height,
            fontWeight: 'bold',
            lineHeight: '6px',
            color: '#555',
            textDecoration: 'none',
            verticalAlign: 'middle',
            background: '#ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            position: 'absolute',
            top,
          }}
        >
          ...
        </span>
      </OverlayTrigger>
    );
  }
}
