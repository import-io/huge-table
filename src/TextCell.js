import React            from 'react';
import OverflowExpander from './OverflowExpander';

const HORZ_PADDING = 5;

export class TextCell extends React.Component {
  static propTypes = {
    cellData: React.PropTypes.object.isRequired,
    cellWidth: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.cellData.text || this.props.cellData.main || '';
    return (
      <div
        style={{
          float: 'left',
          width: this.props.cellWidth,
          padding: `0 ${HORZ_PADDING}px`,
        }}
      >
        <OverflowExpander availableWidth={this.props.cellWidth - HORZ_PADDING * 2}>{content}</OverflowExpander>
      </div>
    );
  }
}
