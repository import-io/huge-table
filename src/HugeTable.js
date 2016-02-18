import React          from 'react';
import FixedDataTable from 'fixed-data-table';
import * as Constants from './constants';
import * as CellUtils from './CellUtils';

import { ListCell }   from './ListCell';
import { HeaderCell } from './HeaderCell';
import TouchWrapper   from './TouchWrapper';

const { Table, Column } = FixedDataTable;

export class HugeTable extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    options: React.PropTypes.shape({
      height: React.PropTypes.number,
      width: React.PropTypes.number,
      mixedContentImage: React.PropTypes.func,
    }),
    schema: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      type: React.PropTypes.string,
    })),
  }

  constructor(props) {
    super(props);

    this.rowGetter                  = this.rowGetter.bind(this);
    this.cellDataGetter             = this.cellDataGetter.bind(this);
    this.cellRenderer               = this.cellRenderer.bind(this);
    this.rowNumberCellRenderer      = this.rowNumberCellRenderer.bind(this);
    this.headerRenderer             = this.headerRenderer.bind(this);
    this.createColumn               = this.createColumn.bind(this);
    this.onColumnResizeEndCallback  = this.onColumnResizeEndCallback.bind(this);
    this.onContentDimensionsChange  = this.onContentDimensionsChange.bind(this);
    this.onScroll                   = this.onScroll.bind(this);

    this.state = {
      columnWidths: {},
      isColumnResizing: undefined,
      columnNameToDataTypeMap: {},
    };
  }

  componentWillMount() {
    this.generateColumnToDataTypeMap(this.props.schema);
    this.generateColumnWidths(this.props.schema);

    this.setState({
      contentHeight: Constants.ROW_HEIGHT * this.props.data.length + Constants.HEADER_HEIGHT,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.generateColumnToDataTypeMap(nextProps.schema);
    this.generateColumnWidths(nextProps.schema);

    this.setState({
      contentHeight: Constants.ROW_HEIGHT * nextProps.data.length + Constants.HEADER_HEIGHT,
    });
  }

  generateColumnToDataTypeMap(schema) {
    const columnNameToDataTypeMap = {};

    schema.forEach((schemaItem) => {
      columnNameToDataTypeMap[schemaItem.name] = schemaItem.type;
    });

    this.setState({columnNameToDataTypeMap});
  }

  generateColumnWidths(schema, dataKey, newColumnWidth) {
    const columnWidths = {};
    let isColumnResizing;
    let contentWidth;

    // Table width - rowNumberColumn (width + border) - columns border / columnsCount
    const calculatedWidth = (this.props.options.width - Constants.ROW_NUMBER_COLUMN_WIDTH - 5 - (this.props.schema.length * 2)) / this.props.schema.length;
    const defaultColumnWidth = Math.max(calculatedWidth, Constants.MIN_COLUMN_WIDTH);

    schema.forEach((schemaItem) => {
      columnWidths[schemaItem.name] = defaultColumnWidth;
    });

    if (dataKey) {
      columnWidths[dataKey] = newColumnWidth;
      isColumnResizing = false;
    }

    contentWidth = schema.reduce((sum, item) => sum + columnWidths[item.name], 0) + Constants.ROW_NUMBER_COLUMN_WIDTH;

    this.setState({
      columnWidths,
      isColumnResizing,
      contentWidth,
    });
  }

  getDataTypeFromColumnName (columnName) {
    return this.state.columnNameToDataTypeMap[columnName];
  }

  rowGetter(rowIndex) {
    return this.props.data[rowIndex];
  }

  cellDataGetter(cellDataKey, rowObject) {
    const cellData = {};
    cellData.main = rowObject[cellDataKey];
    Constants.RETURNED_DATA_TYPES.forEach(function (dataType) {
      cellData[dataType] = rowObject[cellDataKey + '/_' + dataType] || null;
    });
    return cellData;
  }

  cellRenderer(cellData, dataKey, rowData, rowIndex, columnData, cellWidth) {
    const columnDataType = this.getDataTypeFromColumnName(dataKey);

    // If cellData is an array, run cellRenderer on each array item
    if (Array.isArray(cellData.main)) {
      return <ListCell cellData={cellData} type={columnDataType} cellWidth={cellWidth} mixedContentImage={this.props.options.mixedContentImage} />;
    }

    // handle the cell based on the type of the column
    return CellUtils.getComponentDataType(columnDataType, cellData, cellWidth, undefined, this.props.options.mixedContentImage);
  }

  rowNumberCellRenderer(cellData, cellDataKey, rowData, rowIndex) {
    return rowIndex + 1;
  }

  headerRenderer(label, cellDataKey, columnData, rowData, cellWidth) {
    return (
      <HeaderCell label={label} cellWidth={cellWidth} />
    );
  }

  createColumn(schemaItem) {
    return (
      <Column
        label={schemaItem.name}
        minWidth={Constants.MIN_COLUMN_WIDTH}
        width={this.state.columnWidths[schemaItem.name]}
        dataKey={schemaItem.name}
        headerRenderer={this.headerRenderer}
        cellDataGetter={this.cellDataGetter}
        cellRenderer={this.cellRenderer}
        key={schemaItem.name}
        isResizable
      />
    );
  }

  onColumnResizeEndCallback(newColumnWidth, dataKey) {
    this.generateColumnWidths(this.props.schema, dataKey, newColumnWidth);
  }

  onScroll(scrollLeft, scrollTop) {
    this.setState({
      scrollLeft,
      scrollTop,
    });
  }

  onContentDimensionsChange(contentHeight, contentWidth) {
    this.setState({
      contentWidth,
      contentHeight,
    });
  }

  render() {
    const controlledScrolling = (this.state.scrollLeft !== undefined || this.state.scrollTop !== undefined);
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
          rowGetter={this.rowGetter}
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
            dataKey="hugetable-index-column"
            width={Constants.ROW_NUMBER_COLUMN_WIDTH}
            cellRenderer={this.rowNumberCellRenderer}
          />
          {this.props.schema.map(this.createColumn)}
        </Table>
      </TouchWrapper>
    );
  }

}
