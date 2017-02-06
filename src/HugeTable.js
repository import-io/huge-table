import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';

import * as Constants from './constants';
import * as CellUtils from './CellUtils';
import { HeaderCell } from './HeaderCell';
import { TextCell } from './TextCell';
import TouchWrapper from './TouchWrapper';
import { RETURNED_DATA_TYPES } from './constants';
import _ from 'lodash';


export class HugeTable extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    options: React.PropTypes.shape({
      height: React.PropTypes.number,
      width: React.PropTypes.number,
      mixedContentImage: React.PropTypes.func,
      tableScrolled: React.PropTypes.func,
      id: React.PropTypes.string,
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
    onSchemaChange: React.PropTypes.func,
    resizeByContent: React.PropTypes.bool,
    getFontDetails: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      columnWidths: {},
      isColumnResizing: undefined,
      columnNameToDataTypeMap: {},
      columnOrder: [],
      currentSchema: [],
    };

    this.uniqueId = props.options.id || null;
    if (this.uniqueId){
      this.savedColumnsWidth = JSON.parse(localStorage.getItem('huge-table-column-widths')) || {};
      this.savedColumnsWidth[this.uniqueId] = this.savedColumnsWidth[this.uniqueId] || {};
    }

    this.maxTitleWidth = this.props.maxTitleWidth || Constants.MAX_TITLE_WIDTH;
    this.maxContentWidth = this.props.maxContentWidth || Constants.MAX_CONTENT_WIDTH;
  }

  componentDidMount() {
    this.generateColumnToDataTypeMap(this.props.schema);
    this.generateColumnWidths(this.props.schema, this.props.options.width);
    this.generateInitialColumnOrder(this.props.schema);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.schema !== nextProps.schema) {
      this.generateColumnToDataTypeMap(nextProps.schema);
      this.generateInitialColumnOrder(nextProps.schema);
    }

    if(this.props.schema !== nextProps.schema || this.props.options.width !== nextProps.options.width) {
      this.generateColumnWidths(nextProps.schema, nextProps.options.width);
    }

    if(this.props.data.length !== nextProps.data.length) {
      this.setContentHeight(nextProps.data);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.columnOrder !== this.state.columnOrder && !_.isEqual(prevState.columnOrder, this.state.columnOrder)) {
      this.reorderSchema(this.props.schema, this.state.columnOrder);
    }
    if (prevState.currentSchema !== this.state.currentSchema && !_.isEqual(prevState.currentSchema, this.state.currentSchema)) {
      this.onSchemaChange(this.state.currentSchema);
    }
  }

  onSchemaChange = schema => {
    if (this.props.onSchemaChange) {
      this.props.onSchemaChange(schema);
    }
  }

  reorderSchema = (schema, columnOrder) => {
    const newSchema = [];
    columnOrder.forEach(col => {
      const newSchemaItem = schema.find(s => (s.id || s.name) === col);
      if (newSchemaItem) {
        newSchema.push(newSchemaItem);
      }
    });
    this.setState({ currentSchema: newSchema });
  }

  getFontDetails = () => {
    if (this.props.getFontDetails) {
      return this.props.getFontDetails;
    } else {
      return Constants.FONT_DETAILS;
    }
  }

  setContentHeight = (data) => {
    this.setState({
      contentHeight: Constants.ROW_HEIGHT * data.length + Constants.HEADER_HEIGHT,
    });
  }

  generateInitialColumnOrder = (schema) => {
    const columnOrder = schema.map(schemaItem => schemaItem.id || schemaItem.name);
    this.setState({
      columnOrder,
    });
    this.reorderSchema(schema, columnOrder);
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
      const maxColumnWidth = this.props.resizeByContent ? this.getMaxColumnWidth(schemaItem, defaultColumnWidth) : defaultColumnWidth;
      if (this.uniqueId){
        this.state.columnWidths[schemaItem.id || schemaItem.name] = this.savedColumnsWidth[this.uniqueId][schemaItem.id || schemaItem.name] || this.state.columnWidths[schemaItem.id || schemaItem.name] || maxColumnWidth || defaultColumnWidth;
      } else {
        this.state.columnWidths[schemaItem.id || schemaItem.name] = this.state.columnWidths[schemaItem.id || schemaItem.name] || maxColumnWidth || defaultColumnWidth;
      }
      columnWidths[schemaItem.id || schemaItem.name] = this.state.columnWidths[schemaItem.id || schemaItem.name];
    });

    if (columnKey) {
      columnWidths[columnKey] = newColumnWidth;
      if (this.uniqueId){
        this.savedColumnsWidth[this.uniqueId][columnKey] = newColumnWidth;
        localStorage.setItem('huge-table-column-widths', JSON.stringify(this.savedColumnsWidth));
      }
      isColumnResizing = false;
    }

    contentWidth = schema.reduce((sum, item) => sum + columnWidths[item.id || item.name], 0) + Constants.ROW_NUMBER_COLUMN_WIDTH;
    this.setState({
      columnWidths,
      isColumnResizing,
      contentWidth,
    });
  }

  getMaxColumnWidth = (schemaItem, defaultColumnWidth) => {
    let maxColumnWidth = 0;
    //Calculate the column width unless the content is an image
    if (schemaItem.type !== Constants.ColumnTypes.IMAGE) {
      this.props.data.forEach(row => {
        const cellContent = this.getCellContent(row, schemaItem);
        const cellText = this.getCellText(cellContent);
        const cellColumnWidth = this.getContentSize(cellText, this.getFontDetails()); 
        maxColumnWidth = maxColumnWidth > cellColumnWidth ? maxColumnWidth : cellColumnWidth;
      });
      //If the content width is less than the max title width
      //Set the column width based off of max title width
      //Else set column width based off of content width
      if (maxColumnWidth < this.maxTitleWidth) {
        const titleWidth = this.getContentSize(schemaItem.name, this.getFontDetails());
        maxColumnWidth = Math.max(titleWidth, maxColumnWidth);
        maxColumnWidth = Math.min(maxColumnWidth, this.maxTitleWidth);
      } else {
        maxColumnWidth = Math.min(this.maxContentWidth, maxColumnWidth);
      } 
    }
    return maxColumnWidth > defaultColumnWidth ? maxColumnWidth : defaultColumnWidth;
  }

  getContentSize = (txt, font) => {
    this.element = document.createElement('canvas');
    this.context = this.element.getContext('2d');
    this.context.font = font;
    const tsize = {'width':this.context.measureText(txt).width};
    return tsize.width;
  }

  getCellContent = (row, schemaItem) => {
    let content;
    if (schemaItem.type === Constants.ColumnTypes.TEXT) {
      const cellData = Array.isArray(row[schemaItem.name]) ? row[schemaItem.name][0] : row[schemaItem.name];
      if (cellData !== undefined) {
        content = cellData.text !== undefined ? cellData.text : '';
      } else {
        content = '';
      }
    } else if (schemaItem.type === Constants.ColumnTypes.IMAGE) {
      content = '';
    } else {
      content = row[schemaItem.name + '/_text'] !== undefined ? row[schemaItem.name + '/_text'] : row[schemaItem.name];
    }
    return content;
  }

  getCellText = cellContent => {
    if (Array.isArray(cellContent)) {
      return this.getCellText(cellContent[0]);
    } else if (typeof cellContent === 'object') {
      return JSON.stringify(cellContent);
    } else {
      return cellContent;
    }
  }

  createColumn = (schemaItem) => {
    return (
      <Column
        header={props => this.renderHeader({...props, cellData: {main: schemaItem.name}})}
        columnKey={schemaItem.id || schemaItem.name}
        minWidth={Constants.MIN_COLUMN_WIDTH}
        width={this.state.columnWidths[schemaItem.id || schemaItem.name]}
        cell={(props) => this.cellRenderer({...props, schemaItem: schemaItem})}
        key={schemaItem.name}
        isResizable
        isReorderable
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

  cellRenderer = ({rowIndex, width, height, schemaItem}) => {
    const rowObject = this.props.data[rowIndex];
    const cellData = {};
    cellData.main = rowObject[schemaItem.name];
    Constants.RETURNED_DATA_TYPES.forEach(dataType => {
      cellData[dataType] = rowObject[schemaItem.name + '/_' + dataType] || null;
    });
    const columnDataType = this.state.columnNameToDataTypeMap[schemaItem.name];
    const cellCustomRenderer = this.props.renderers && this.props.renderers[columnDataType];
    cellData.type = columnDataType;

    return (
      <Cell>
        {CellUtils.getComponentDataType({
          columnDataType,
          cellData,
          width,
          height,
          columnKey: schemaItem.id || schemaItem.name,
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

  onColumnReorderEndCallback = (event) => {
    const columnOrder = this.state.columnOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (event.columnAfter) {
      const index = columnOrder.indexOf(event.columnAfter);
      columnOrder.splice(index, 0, event.reorderColumn);
    } else {
      columnOrder.push(event.reorderColumn);
    }
    this.setState({
      columnOrder,
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
          onColumnReorderEndCallback={this.onColumnReorderEndCallback}
        isColumnReordering={false}
        >
          <Column
            key="hugetable-index-column"
            columnKey="hugetable-index-column"
            width={Constants.ROW_NUMBER_COLUMN_WIDTH}
            header={props => this.renderHeader({...props, cellData: {main: '#'}})}
            cell={(props) => <Cell><TextCell {...props} cellData={{main: props.rowIndex+1}}/></Cell>}

          />
        {this.state.currentSchema.map(this.createColumn)}
        </Table>
      </TouchWrapper>
    );
  }
}
