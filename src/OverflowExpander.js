import React            from 'react';
import Portal           from 'react-portal';
import PropTypes from 'prop-types';

export default class OverflowExpander extends React.Component {
  static propTypes = {
    availableWidth: PropTypes.number.isRequired,
    children: PropTypes.any,
  }

  constructor(props) {
    super(props);

    this.state = {
      doesOverflow: false,
      showPopover: false,
    };
  }

  componentDidMount() {
    this.setState({ //eslint-disable-line react/no-did-mount-set-state
      doesOverflow: this.doesOverflow(),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const doesOverflow = this.doesOverflow();

    if (prevState.doesOverflow !== doesOverflow) {
      this.setState({ //eslint-disable-line react/no-did-update-set-state
        doesOverflow,
      });
    }
  }

  doesOverflow = () => {
    const size = this.refs.measure.clientWidth;
    return size >= this.props.availableWidth;
  }

  handleMouseEnter = (e) => {
    const clientRect = e.target.getBoundingClientRect();
    const docWidth = document.body.getBoundingClientRect().width;
    const leftSide = clientRect.left + this.props.availableWidth > docWidth / 2;
    const arrowWidth = 11;

    this.setState({
      showPopover: true,
      popoverAnchorLeft: leftSide ? 'auto' : clientRect.left + this.props.availableWidth,
      popoverAnchorRight: leftSide ? docWidth - clientRect.left + arrowWidth : 'auto',
      popoverAnchorTop: (clientRect.top + clientRect.bottom) / 2,
      popoverSide: leftSide ? 'left' : 'right',
    });
  }

  handleMouseLeave = () => {
    this.setState({
      showPopover: false,
    });
  }

  render() {
    return (
      <span onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={{
        display: 'inline-block',
        width: this.props.availableWidth,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
  	    <span ref="measure" style={{
    position: 'absolute',
    visibility: 'hidden',
  	    }}>{this.props.children}</span>
        <span>{this.props.children}</span>
        <Portal isOpened={!!(this.state.doesOverflow && this.state.showPopover)}>
          <div className={`popover fade ${this.state.popoverSide} in`} style={{
            display: 'block',
            position: 'absolute',
            top: this.state.popoverAnchorTop,
            left: this.state.popoverAnchorLeft,
            right: this.state.popoverAnchorRight,
            transform: 'translateY(-50%)',
            backgroundColor: '#fff',
          }}>
            <div className="arrow" style={{top: '50%'}}></div>
            <div className="popover-content" style={{wordWrap: 'break-word'}}>{this.props.children}</div>
          </div>
        </Portal>
      </span>
    );
  }
}
