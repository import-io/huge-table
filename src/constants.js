import keyMirror from 'keymirror';

const cellPadding          = 8;
const lineHeight           = 26;
const headerHeight         = (cellPadding * 2) + lineHeight + 7;
const rowHeight            = (cellPadding * 2) + (lineHeight * 2) - 3;
const rowNumberColumnWidth = 40;

export const ColumnTypes = keyMirror({
  IMAGE: null,
  URL: null,
  TEXT: null,
});

export const ROW_HEIGHT               = rowHeight;
export const HEADER_HEIGHT            = headerHeight;
export const MIN_COLUMN_WIDTH         = 140;
export const ROW_NUMBER_COLUMN_WIDTH  = rowNumberColumnWidth;
export const FLEX_GROW                = 1;
export const CELL_EXPANDER_WIDTH      = 35;
export const RETURNED_DATA_TYPES      = ['currency', 'utc', 'text', 'alt', 'title', 'source'];
export const MAX_TITLE_WIDTH	 	  = 140;
export const MAX_CONTENT_WIDTH   	  = 700;
export const FONT_DETAILS			  = '15px Helvetica Neue, sans-serif';
