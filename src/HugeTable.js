import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

import * as Constants from './constants';
import * as CellUtils from './CellUtils';
import { HeaderCell } from './HeaderCell';
import { TextCell } from './TextCell';
import TouchWrapper from './TouchWrapper';
import { RETURNED_DATA_TYPES } from './constants';


export class HugeTable extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    options: React.PropTypes.shape({
      height: React.PropTypes.number,
      width: React.PropTypes.number,
      mixedContentImage: React.PropTypes.func,
      tableScrolled: React.PropTypes.func,
    }),
    schema: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      type: React.PropTypes.string,
    })),
    renderers: React.PropTypes.shape(RETURNED_DATA_TYPES.reduce((initial, next) => {
      return {
        ...initial,
        [next]: React.PropTypes.func,
      };
    }, {HEADER: React.PropTypes.func})),
  }

  constructor(props) {
    super(props);

    this.state = {
      columnWidths: {},
      isColumnResizing: undefined,
      columnNameToDataTypeMap: {},
    };
  }

  componentWillMount() {
    this.generateColumnToDataTypeMap(this.props.schema);
    this.generateColumnWidths(this.props.schema, this.props.options.width);

    this.setState({
      contentHeight: Constants.ROW_HEIGHT * this.props.data.length + Constants.HEADER_HEIGHT,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.schema !== nextProps.schema) {
      this.generateColumnToDataTypeMap(nextProps.schema);
    }

    if(this.props.schema !== nextProps.schema || this.props.options.width !== nextProps.options.width) {
      this.generateColumnWidths(nextProps.schema, nextProps.options.width);
    }

    if(this.props.data.length !== nextProps.data.length) {
      this.setState({
        contentHeight: Constants.ROW_HEIGHT * nextProps.data.length + Constants.HEADER_HEIGHT,
      });
    }
  }

  generateColumnToDataTypeMap = (schema) => {
    const columnNameToDataTypeMap = {};

    schema.forEach((schemaItem) => {
      columnNameToDataTypeMap[schemaItem.name] = schemaItem.type;
    });

    this.setState({columnNameToDataTypeMap});
  }

  generateColumnWidths = (schema, width, columnKey, newColumnWidth) => {
    const columnWidths = {};
    let isColumnResizing;
    let contentWidth;

    // Table width - rowNumberColumn (width + border) - columns border / columnsCount
    const calculatedWidth = (width - Constants.ROW_NUMBER_COLUMN_WIDTH - 5 - (schema.length * 2)) / Math.max(schema.length, 1);
    const defaultColumnWidth = Math.max(calculatedWidth, Constants.MIN_COLUMN_WIDTH);

    schema.forEach((schemaItem) => {
      columnWidths[schemaItem.name] = defaultColumnWidth;
    });

    if (columnKey) {
      columnWidths[columnKey] = newColumnWidth;
      isColumnResizing = false;
    }

    contentWidth = schema.reduce((sum, item) => sum + columnWidths[item.name], 0) + Constants.ROW_NUMBER_COLUMN_WIDTH;

    this.setState({
      columnWidths,
      isColumnResizing,
      contentWidth,
    });
  }

  createColumn = (schemaItem) => {
    return (
      <Column
        header={props => this.renderHeader({...props, cellData: {main: schemaItem.name}})}
        columnKey={schemaItem.name}
        minWidth={Constants.MIN_COLUMN_WIDTH}
        width={this.state.columnWidths[schemaItem.name]}
        cell={(props) => this.cellRenderer({...props, schemaItemName: schemaItem.name})}
        key={schemaItem.name}
        isResizable
      />
    );
  }

  renderHeader = (props) => {
    if(this.props.renderers && this.props.renderers.HEADER && typeof this.props.renderers.HEADER === 'function') {
      return (
        <Cell {...props}>
          {this.props.renderers.HEADER(props)}
        </Cell>
      );
    } else {
      return <HeaderCell {...props} />;
    }
  }

  cellRenderer = ({rowIndex, width, height, schemaItemName}) => {
    const rowObject = this.props.data[rowIndex];
    const cellData = {};
    cellData.main = rowObject[schemaItemName];
    Constants.RETURNED_DATA_TYPES.forEach(dataType => {
      cellData[dataType] = rowObject[schemaItemName + '/_' + dataType] || null;
    });

    const columnDataType = this.state.columnNameToDataTypeMap[schemaItemName];
    const cellCustomRenderer = this.props.renderers && this.props.renderers[columnDataType];
    cellData.type = columnDataType;

    return (
      <Cell>
        {CellUtils.getComponentDataType({
          columnDataType,
          cellData,
          width,
          height,
          columnKey: schemaItemName,
          mixedContentImage: this.props.options.mixedContentImage,
          cellCustomRenderer})}
      </Cell>
    );
  }

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.generateColumnWidths(this.props.schema, this.props.options.width, columnKey, newColumnWidth);
  }

  onScroll = (scrollLeft, scrollTop) => {
    this.setState({
      scrollLeft,
      scrollTop,
    });

    if(this.props.options.tableScrolled) {
      this.props.options.tableScrolled(scrollLeft, scrollTop);
    }
  }

  onContentDimensionsChange = (contentHeight, contentWidth) => {
    this.setState({
      contentWidth,
      contentHeight,
    });
  }

  render() {
    const controlledScrolling = (this.state.scrollLeft !== undefined && this.state.scrollLeft !== 0) || (this.state.scrollTop !== undefined && this.state.scrollTop !== 0);
    const tableWidth = this.props.options.width;
    const tableHeight = this.props.options.height - Constants.HEADER_HEIGHT;

    return (
      <TouchWrapper
        onScroll={this.onScroll}
        tableWidth={tableWidth}
        tableHeight={tableHeight}
        contentWidth={this.state.contentWidth}
        contentHeight={this.state.contentHeight}
      >
        <Table
          rowHeight={Constants.ROW_HEIGHT}
          rowsCount={this.props.data.length}
          width={tableWidth}
          scrollLeft={this.state.scrollLeft}
          scrollTop={this.state.scrollTop}
          overflowX={controlledScrolling ? 'hidden' : 'auto'}
          overflowY={controlledScrolling ? 'hidden' : 'auto'}
          height={tableHeight}
          headerHeight={Constants.HEADER_HEIGHT}
          isColumnResizing={this.state.isColumnResizing}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          onContentDimensionsChange={this.onContentDimensionsChange}
        >
          <Column
            key="hugetable-index-column"
            columnKey="hugetable-index-column"
            width={Constants.ROW_NUMBER_COLUMN_WIDTH}
            header={props => this.renderHeader({...props, cellData: {main: '#'}})}
            cell={(props) => <Cell><TextCell {...props} cellData={{main: props.rowIndex+1}}/></Cell>}
          />
          {this.props.schema.map(this.createColumn)}
        </Table>
      </TouchWrapper>
    );
  }
}
