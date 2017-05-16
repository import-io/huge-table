import keyMirror from 'keymirror';

const defaultCellPadding = {
  cellPaddingTop: 4,
  cellPaddingBottom: 0,
  cellPaddingLeft: 8,
  cellPaddingRight: 0,
};

const imageCellPadding = {
  cellPaddingTop: 1,
  cellPaddingBottom: 0,
  cellPaddingLeft: 8,
  cellPaddingRight: 0,
};

const cellPaddingCalculatedHeight = defaultCellPadding.cellPaddingTop + defaultCellPadding.cellPaddingBottom;

const lineHeight           = 26;
const headerHeight         = (cellPaddingCalculatedHeight) + lineHeight + 7;
const rowHeight            = (cellPaddingCalculatedHeight) + (lineHeight * 2) - 4;
const rowNumberColumnWidth = 40;

export const ColumnTypes = keyMirror({
  IMAGE: null,
  URL: null,
  TEXT: null,
  AUTO: null,
});

export const CELL_PADDING             = defaultCellPadding;
export const IMAGE_CELL_PADDING       = imageCellPadding;
export const LINE_HEIGHT              = lineHeight;
export const ROW_HEIGHT               = rowHeight;
export const HEADER_HEIGHT            = headerHeight;
export const MIN_COLUMN_WIDTH         = 140;
export const ROW_NUMBER_COLUMN_WIDTH  = rowNumberColumnWidth;
export const FLEX_GROW                = 1;
export const CELL_EXPANDER_WIDTH      = 35;
export const CELL_EXPANDER_SAMELINE   = true;
export const RETURNED_DATA_TYPES      = ['currency', 'utc', 'text', 'alt', 'title', 'source'];
export const MAX_TITLE_WIDTH          = 140;
export const MAX_CONTENT_WIDTH        = 700;
export const FONT_DETAILS             = '15px Helvetica Neue, sans-serif';
