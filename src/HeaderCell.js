import React from 'react';

export class HeaderCell extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    cellWidth: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      width: this.props.cellWidth,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'left',
      padding: '0 5px',
    };

    return (
      <div style={style} title={this.props.label}>{this.props.label}</div>
    );
  }
}
