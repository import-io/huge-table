import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
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
      maxTitleWidth: React.PropTypes.number,
      maxContentWidth: React.PropTypes.number,
      minColumnWidth: React.PropTypes.number,
      rowNumberColumnWidth: React.PropTypes.number,
      fontDetails: React.PropTypes.string,
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
    hideRowNumbers: React.PropTypes.bool,
    showScrollingArrows: React.PropTypes.bool,
    scrollToNewColumn: React.PropTypes.bool,
    onScrollToNewColumn: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      columnWidths: {},
      isColumnResizing: undefined,
      columnNameToDataTypeMap: {},
      columnOrder: [],
      currentSchema: [],
      shouldActivateLeftScroll: false,
      shouldActivateRightScroll: false,
      scrollLeft: 0,
    };

    this.uniqueId = props.options.id || null;
    if (this.uniqueId){
      this.savedColumnsWidth = JSON.parse(localStorage.getItem('huge-table-column-widths')) || {};
      this.savedColumnsWidth[this.uniqueId] = this.savedColumnsWidth[this.uniqueId] || {};
    }

    this.maxTitleWidth = props.options.maxTitleWidth || Constants.MAX_TITLE_WIDTH;
    this.maxContentWidth = props.options.maxContentWidth || Constants.MAX_CONTENT_WIDTH;
    this.fontDetails = props.options.fontDetails || Constants.FONT_DETAILS;
    this.minColumnWidth = props.options.minColumnWidth || Constants.MIN_COLUMN_WIDTH;
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
      this.handleScroll(this.state.scrollLeft);
    }
    
    if (prevState.currentSchema < this.state.currentSchema && this.state.shouldShowScrolls && this.props.scrollToNewColumn) {
      this.scrollNewColumnIntoView();
    }

  }

  onSchemaChange = schema => {
    if (this.props.onSchemaChange) {
      this.props.onSchemaChange(schema);
    }
  }

  scrollNewColumnIntoView = () => {
    if (this.refs.table) {
      this.handleScroll(this.refs.table.state.maxScrollX);
      if (this.props.onScrollToNewColumn) {
        this.props.onScrollToNewColumn();
      }
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
    const defaultColumnWidth = Math.max(calculatedWidth, this.minColumnWidth);

    schema.forEach((schemaItem) => {
      const maxColumnWidth = this.props.resizeByContent ? this.getMaxColumnWidth(schemaItem, this.minColumnWidth) : defaultColumnWidth;
      if (this.uniqueId){
        //Reference the content width over the width set in state if we have data and we are passed the resizeByContent prop
        if (this.props.data.length > 0 && this.props.resizeByContent) {
          this.state.columnWidths[schemaItem.id || schemaItem.name] = this.savedColumnsWidth[this.uniqueId][schemaItem.id || schemaItem.name] || maxColumnWidth || this.state.columnWidths[schemaItem.id || schemaItem.name] || defaultColumnWidth;
        } else {
          this.state.columnWidths[schemaItem.id || schemaItem.name] = this.savedColumnsWidth[this.uniqueId][schemaItem.id || schemaItem.name] || this.state.columnWidths[schemaItem.id || schemaItem.name] || maxColumnWidth || defaultColumnWidth;
        }
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
        const cellColumnWidth = this.getContentSize(cellText, this.fontDetails);
        maxColumnWidth = maxColumnWidth > cellColumnWidth ? maxColumnWidth : cellColumnWidth;
      });

      //If the content width is less than the max title width
      //Set the column width based off of max title width
      //Else set column width based off of content width
      if (maxColumnWidth < this.maxTitleWidth) {
        const titleWidth = this.getContentSize(schemaItem.name, this.fontDetails);
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

  createColumn = (schemaItem, idx) => {
    let width = this.state.columnWidths[schemaItem.id || schemaItem.name];
    const lastColumn = idx === (this.state.currentSchema.length - 1) && this.state.currentSchema.length > 1;
    if (this.state.shouldShowScrolls && lastColumn) {
      // this adds some extra room to accomodate the scrolling arrows
      width = width + 120;
    }
    let cellClass = '';
    if (this.props.showScrollingArrows && this.state.shouldShowScrolls) {
      if (this.props.hideRowNumbers && idx === 0) {
        cellClass = 'hugetable-index-column nudge';
      } else if (lastColumn) {
        cellClass = 'last-column';
      }
    }
    // if we are hiding the row numbers but showing scrolling arrows, need to nudge this column with padding
    return (
      <Column
        cellClassName={cellClass}
        header={props => this.renderHeader({...props, cellData: {main: schemaItem.name}})}
        columnKey={schemaItem.id || schemaItem.name}
        minWidth={this.minColumnWidth}
        width={width}
        cell={(props) => this.cellRenderer({...props, schemaItem })}
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
      scrollLeft: scrollLeft ? scrollLeft : this.state.scrollLeft,
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

  handleMouseEnter = (scrollVal) => {
    this.intervalId = setInterval(() => this.moveScrollPos(scrollVal), 10);
  }

  handleMouseLeave = () => {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  moveScrollPos = (val) => {
    if (this.state.scrollLeft === 0 && val >= 0 || this.state.scrollLeft > 0) {
      this.handleScroll(this.state.scrollLeft+val,);
    }
  }

  calcElementsWidth = (elementsArr) => {
    return elementsArr.map(e => e.getBoundingClientRect().width).reduce((i, n) => i+n, 0);
  }

  getChildElements = () => {
    const headerContainer = this.getHeaderContainer();
    const childElements = headerContainer ? Array.from(this.getHeaderContainer().children) : [];
    return childElements;
  }

  handleScroll = (scrollLeft) => {
    const ALL_ELEMENTS_WIDTH = this.calcElementsWidth(this.getChildElements());
    const shouldShowScrolls = ALL_ELEMENTS_WIDTH > this.props.options.width && this.props.showScrollingArrows;
    this.setState({
      scrollLeft,
      shouldShowScrolls,
      shouldActivateLeftScroll: scrollLeft > 0,
      shouldActivateRightScroll: ALL_ELEMENTS_WIDTH-1 > (this.props.options.width+scrollLeft),
    });
    return true;
  }

  getListContainerWidth = () => {
    return this.getHeaderContainer().getBoundingClientRect().width;
  }

  getHeaderContainer = () => {
    const headerCell = document.querySelector('.hugetable-index-column');
    return headerCell ? headerCell.parentElement : null;
  }

  render() {
    const tableWidth = this.props.options.width;
    const tableHeight = this.props.options.height - Constants.HEADER_HEIGHT;
    let rowNumberColumnWidth = this.props.options.rowNumberColumnWidth ? this.props.options.rowNumberColumnWidth : Constants.ROW_NUMBER_COLUMN_WIDTH;
    let leftScroll, rightScroll;
    if(this.state.shouldShowScrolls) {
      // increase the size of the row number column so there is no overlap
      rowNumberColumnWidth = rowNumberColumnWidth + 40;
      leftScroll = (
        <section className={classNames('scroll-toggle', 'left', {'active': this.state.shouldActivateLeftScroll})} onMouseEnter={() => this.handleMouseEnter(-5)} onMouseLeave={() => this.handleMouseLeave()}>
          <i className="fa fa-chevron-left fa-lg"></i>
        </section>
      );

      rightScroll = (
        <section className={classNames('scroll-toggle', 'right', {'active': this.state.shouldActivateRightScroll})} onMouseEnter={() => this.handleMouseEnter(5)} onMouseLeave={() => this.handleMouseLeave()}>
          <i className="fa fa-chevron-right fa-lg"></i>
        </section>
      );
    }

    return (
      <TouchWrapper
        onScroll={this.onScroll}
        tableWidth={tableWidth}
        tableHeight={tableHeight}
        contentWidth={this.state.contentWidth}
        contentHeight={this.state.contentHeight}
      >
      <div style={{ position: 'relative', height: tableHeight, width: tableWidth }}>
        {leftScroll}
        {rightScroll}
        <Table
          onHorizontalScroll={this.handleScroll}
          ref="table"
          rowHeight={Constants.ROW_HEIGHT}
          rowsCount={this.props.data.length}
          width={tableWidth}
          scrollLeft={this.state.scrollLeft}
          scrollTop={this.state.scrollTop}
          height={tableHeight}
          headerHeight={Constants.HEADER_HEIGHT}
          isColumnResizing={this.state.isColumnResizing}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          onContentDimensionsChange={this.onContentDimensionsChange}
          onColumnReorderEndCallback={this.onColumnReorderEndCallback}
          isColumnReordering={false}
        >
        {(() => {
          if (!this.props.hideRowNumbers) {
            // add cellClassName nudge if we show scrolls, which adds padding to this cell so we can still see the number
            return (
              <Column
                cellClassName={this.state.shouldShowScrolls ? 'hugetable-index-column nudge' : 'hugetable-index-column'}
                key="hugetable-index-column"
                columnKey="hugetable-index-column"
                width={rowNumberColumnWidth}
                header={props => this.renderHeader({...props, cellData: {main: '#'}})}
                cell={(props) => <Cell><TextCell {...props} cellData={{main: props.rowIndex+1}}/></Cell>}
              />
            );
          }
        })()}
          {this.state.currentSchema.map(this.createColumn)}
        </Table>
      </div>
      </TouchWrapper>
    );
  }
}
