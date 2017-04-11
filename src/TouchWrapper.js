import React from 'react';
import ZyngaScroller from './ZyngaScroller';
import TouchableArea from './TouchableArea';

export default class TouchWrapper extends React.Component {
  static propTypes = {
    tableWidth: React.PropTypes.number.isRequired,
    tableHeight: React.PropTypes.number.isRequired,
    contentWidth: React.PropTypes.number,
    contentHeight: React.PropTypes.number,
    onScroll: React.PropTypes.func.isRequired,
    children: React.PropTypes.any,
  }

  state = {
    left: 0,
    top: 0,
    initialized: false,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scroller = new ZyngaScroller(this.onScroll);
    this.scroller.setDimensions(
      this.props.tableWidth,
      this.props.tableHeight,
      this.props.contentWidth,
      this.props.contentHeight
    );
  }

  componentWillReceiveProps(nextProps) {
    const diffTableWidth = nextProps.tableWidth !== this.props.tableWidth;
    const diffTableHeight = nextProps.tableHeight !== this.props.tableHeight;
    const diffContentWidth = nextProps.contentWidth !== this.props.contentWidth;
    const diffContentHeight = nextProps.contentHeight !== this.props.contentHeight;

    if(this.scroller && (diffTableWidth || diffTableHeight || diffContentWidth || diffContentHeight)) {
      this.scroller.setDimensions(nextProps.tableWidth, nextProps.tableHeight, nextProps.contentWidth, nextProps.contentHeight);
    }
  }

  onScroll = (scrollLeft, scrollTop) => {
    if(this.state.initialized) {
      this.props.onScroll(scrollLeft, scrollTop);
    } else {
      this.setState({
        initialized: true,
      });
    }
  }

  render() {
    return (
      <TouchableArea scroller={this.scroller}>
        {this.props.children}
      </TouchableArea>
    );
  }
}
