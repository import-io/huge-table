import React from 'react';
import PropTypes from 'prop-types';

export default class TouchableArea extends React.Component {
  static propTypes = {
    scroller: PropTypes.object,
    touchable: PropTypes.bool.isRequired,
    children: PropTypes.any,
  }

  static defaultProps = {
    touchable: true,
  }

  handleTouchStart = (e) => {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  }

  handleTouchMove = (e) => {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  }

  handleTouchEnd = (e) => {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  }

  render() {
    return (
      <div
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}>
        {this.props.children}
      </div>
    );
  }
}
