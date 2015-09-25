import React from 'react';
import OverflowExpander from './OverflowExpander';

const HORZ_PADDING = 5;

export class UrlCell extends React.Component {
  static propTypes = {
    cellData: React.PropTypes.object.isRequired,
    cellWidth: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.cellData.text || this.props.cellData.main;
    return (
      <div
        style={{
          float: 'left',
          width: this.props.cellWidth,
          padding: `0 ${HORZ_PADDING}px`,
        }}
      >
        <a
          className="url-cell-content"
          href={this.props.cellData.main}
          title={this.props.cellData.title || this.props.cellData.text || this.props.cellData.main}
          target={'_blank'}
        >
          <OverflowExpander availableWidth={this.props.cellWidth - HORZ_PADDING * 2}>{content}</OverflowExpander>
        </a>
      </div>
    );
  }
}
