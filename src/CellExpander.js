import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export class CellExpander extends React.Component {
  static propTypes = {
    shouldFloatRight: React.PropTypes.bool,
    children: React.PropTypes.any,
  }

  defaultProps = {
    shouldFloatRight: false,
  }

  constructor(props) {
    super(props);

    this.renderPopover = this.renderPopover.bind(this);
  }

  renderPopover() {
    return (
      <Popover id="details-popover">
        {this.props.children}
      </Popover>
    );
  }

  render() {
    return (
      <OverlayTrigger
         rootClose
         trigger="click"
         placement="top"
         overlay={this.renderPopover()}
      >
        <span
          style={{
            margin: '10px 5px',
            float: this.props.shouldFloatRight ? 'right' : undefined,
          }}
          className="badge"
        >
          ...
        </span>
      </OverlayTrigger>
    );
  }
}
