import React from 'react';
import Portal from 'react-portal';
import { Cell } from 'fixed-data-table';
import * as Constants from './constants';


export class ImageCell extends React.Component {
  static propTypes = {
    cellData: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    columnKey: React.PropTypes.string.isRequired,
    mixedContentImage: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      showPopover: false,
    };
  }

  handleMouseEnter(e) {
    const clientRect = e.target.getBoundingClientRect();

    this.setState({
      showPopover: true,
      popoverTop: (clientRect.top + clientRect.bottom) / 2,
      popoverLeft: clientRect.left + this.props.width - 20,
    });
  }

  handleMouseLeave() {
    this.setState({
      showPopover: false,
    });
  }

  render() {
    const imageUrl = this.props.mixedContentImage ? this.props.mixedContentImage(this.props.cellData.main) : this.props.cellData.main;

    return (
      <Cell {...this.props}>
        <a
          href={this.props.cellData.main}
          title={this.props.cellData.alt || this.props.cellData.main}
          target="_blank"
          style={{
            display: 'inline-block',
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div
            className="example-image"
            style={{
              margin: '5px 10px',
              backgroundImage: imageUrl ? `url(${imageUrl})` : null,
              backgroundSize: 'contain',
              backgroundPositionY: 'center',
              backgroundRepeat: 'no-repeat',
              height: Constants.ROW_HEIGHT - 10,
              width: this.props.width - 20,
            }}
          />
          <Portal isOpened={!!(imageUrl && this.state.showPopover)}>
            <div className="popover fade right in" style={{
              display: 'block',
              position: 'absolute',
              top: this.state.popoverTop,
              left: this.state.popoverLeft,
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
            }}>
              <div className="arrow" style={{top: '50%'}}></div>
              <div className="popover-content">
                <img
                  style={{width: '100%'}}
                  src={imageUrl}
                  title={this.props.cellData.alt || this.props.cellData.main}
                />
              </div>
            </div>
          </Portal>
        </a>
      </Cell>
    );
  }
}
