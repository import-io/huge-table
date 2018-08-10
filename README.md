# HugeTable

Table component to handle huge sets of data, based on Facebook's FixedDataTable and Schrodinger's Fixed Data Table 2

## How to use it

Include the `HugeTable.css` file from the `dist` folder.

**Important** For those using LESS in your projects: import the CSS file then the LESS file after it. This is a workaround to avoid a LESS bug caused when LESS compiles `calc()` from a CSS file. Example below:

```
@import (less) "../../node_modules/huge-table/dist/HugeTable.css";
@import "../../node_modules/huge-table/dist/HugeTableLess.less";

```


```javascript
// data and schema examples can be found inside the examples directory.

var mountNode = document.getElementById('table-results');

var options = {
  height: 400,
  width: 600
};

React.render(<HugeTable data={data} schema={schema} options={options} />, mountNode);
```

More comprehensive example can be found inside the [examples](examples) directory.

## Table API

- **data** - Takes an array of data that should be displayed inside the table,
- **schema** - Takes an array of objects defining the name of particular fields to look for inside the `data` array, and their type of data, which will tell the table which Cell type to use for displaying a particular column of data. Check `examples` directory for exemplary set of data and schema files.
- **renderers** - A map of cell renderers. This object can be used to define a custom cell renderer for column headers or cells of particular data type. Check the example to see how this can be used. Available renderer types are `{HEADER, DOUBLE, URL, STRING, IMAGE}`.
- **options.height** - Height of the table component,
- **options.width** - Width of the table component,
- **options.mixedContentImage** - Function that can handle mixed content warnings for images being loaded inside the table. Function will be invoked with image URL, and allows developers to decide what do do when page is loaded for example with `https`, and image url has `http` protocol. Check `examples` directory for an example on how to use this.
- **options.tableScrolled** - Function that will be called whenever the table has been scrolled. It can be used to hook to the scrolling of the table on mobile devices, and use it to adjust the view around the table according to the table scrolling.
- **options.rowNumberColumnWidth** - width of the row number column.
- **hideRowNumbers** Boolean prop that when present will hide the row number column.
- **onSchemaChange** Function that fires anytime the inserted schema changes. Useful when tapping into column reordering. Returns `currentSchema`
- **rowHeight**
- **headerHeight**
- **lineHeight**
- **cellPadding**

## Commands

### Production build
```
npm run prepublish
```

Build the project in a production ready way.

## Releasing

- Commit changes to the repository on a separate branch,
- Bump version in package.json file, after you are done with your changes (remember about SemVer!),
- After you are done with your functionality, or if you think it is large enough, create a pull request with master branch to be peer reviewed,
- After changes are merged into master branch, checkout master branch, run tests one more time, and publish this package to npm repository.

## Changelog
### 8.0.0

- Add ability to optionally show column names


### 8.0.0

- React 16 support

### 7.2.4

- Add class for columns with redactPII enabled.

### 7.2.0

**API Additions**
- `resizableColumns` ability to override resizable columns, default is `true`
- `reorderableColumns` ability to override reorderable columns, default is `true`
- `disableClickEvents` disables clickable links on table

### 7.1.0
- Add ability to resize headers based off of text length.

### 7.0.6
- Fixed case where TextCell would improperly identify empty strings as falsey and pass an object to OverflowExpander causing it to break.

### 7.0.5
- Fixes for FE-769- where Column popovers go offscreen when many items in cell.

### 7.0.3
- fixed case in which cellData where text data was passed under main.text rather than in .text works correctly now

### 7.0.2
- fixed case in which TextCell would improperly stringify text when given cellData.type of 'AUTO'

### 6.14.1
- removed console logging accidentally left in

### 6.14.0
- introduced code in CellUtils.getComponentContent to account for a schemaItem type of "AUTO".  A schemaItem type of AUTO will first look for a cellData.item.src value, and if this exists, will use the ImageCell cellRenderer; if it doesn't exist, will use the default TextCell cellRenderer

### 6.13.11
- patch to fix edge case for OverflowExpander max-width

### 6.13.10
- patch to fix availableWidth calculation from sizing for OverflowExpander

**API Additions**
- added `scrollToColumn` (number) prop which is the index of column to scroll to.

### 6.13

**API Additions**
- added `scrollToColumn` (number) prop which is the index of column to scroll to.

### 6.11

**API Additions**
- added `activeColumnIndex` and `onActiveColumnChange` props


### 6.10

- Moved scrolling arrows to right side

### 6.9

**API Additions**

- Changed `cellPadding` prop to be an object with 4 members: cellPaddingTop, cellPaddingBottom, cellPaddingLeft, cellPaddingRight
- Included aphrodite library (https://github.com/Khan/aphrodite) for injecting inline styling into components
- Reworked the way CellExpander element is displayed and interacts with ImageCell/URLCell/TextCell; it's now right-justified within field context and on the same line
  - note: backwards-compatible; set CELL_EXPANDER_SAMELINE = true for new behavior, false for previous version behavior
- Added code/behavior supplying a default image for ImageCell images that are broken/404
- Added more styling flexibility when dealing with cells/content, although not all is being used at present

### 6.8

**API Additions**

- Added `rowHeight`, `headerHeight`, `lineHeight`, and `cellPadding` as new props

### 6.7

**API Additions**

- Added `scrollToNewColumn` (boolean) prop, which will scroll to a newly added column

### 6.6.2

- Reference column widths by cell content rather than width in state when resizeByContent prop is set and data is present

### 6.6

- Created separate less file to support users that are using less in their projects

### 6.5

**API Additions**

- Added `showScrollingArrows` (boolean) prop, which will show horizontal arrows if horizontal scrolling is available

### 6.4

**API Additions**

- Added `hideRowNumbers` (boolean) prop, which hides the row number column.
- Added `rowNumberColumnWidth` to options prop, which allows an override of the width of the row number column.

### 6.3.3

- Add ability to pass in default min column width and move font details to options

### 6.3.2

- Allow for column keys to be unique id or name. Add props for maxContentWidth and maxTitleWidth

### 6.2.2

- Return stringified object instead of string length

### 6.2.1

**Style changes**

- Determine auto column width with canvas
- Make auto resize column and onSchemaChange callback optional

### 6.2.0

**Style changes**

- Added default columnn sized to be based off of character count

### 6.1.4
- Styling changes, moving ellipsis to top
- Added extra checks for schema and column changes so `onSchemaChange` fires less often

### 6.1.0

**API Additions**

- Added `onSchemaChange` prop, which is a function that returns the updated schema after reordering columns.

### 6.0.0

- Added column reordering support and upgraded to [Fixed Data Table 2](https://github.com/schrodinger/fixed-data-table-2)

### 5.2.0

- Added id (string) to options so we can save in localStorage by id. Default to not saving if there is no id.

### 5.1.2

- Reading columnWidths from localStorage to keep track of user changed columns.

### 5.1.0

**API Addition**

- Updating mixedContentImageHelper to use the new API, supporting both referer and url.

### 5.0.2

**Style changes**

- Changing the default position of cell expander.

### 5.0.1

**Style changes**

- Fixing the display of more values label.

### 5.0.0

**Style changes**

- Modifying styles of the elements.

### 4.3.0

**API Additions**

- Adding `renderers` prop, which allow to specify custom renderers.

### 4.2.3

**Bug/Patch fixes**

- Fixing the support for JSON object fields.

### 4.2.2

**Bug/Patch fixes**

- Fixing the display of the ListCells to correctly include CellExpanders,
- Adding "#" to the first column header.

### 4.2.1

**Bug/Patch fixes**

- Fixing column resizing issues.

### 4.2.0

**API Additions**

- Moving to `fixed-data-table` v0.6.0 and supporting new cell renderers.

### 4.1.0

**API Additions**

- Adding a, `options.tableScrolled` prop that can an event handler for scrolling inside the table.

**Bug/Patch fixes**

- Fixing the scrolls on desktop/mobile.

### 4.0.7

**Bug/Patch fixes**

- Adding support for scrolling on mobile, with dynamic data. Now when the data inside the table is updated, mobile scroll handle this case.

### 4.0.6

**Bug/Patch fixes**

- Updating to react 0.14.x.

### 4.0.5

**Bug/Patch fixes**

- Fixing the badge for displaying multiple values, when cell has an array of values.

### 4.0.4

**Bug/Patch fixes**

- Fixing the `main` property in package.json.

### 4.0.3

**Bug/Patch fixes**

- Updating the repository link in the package.json.

### 4.0.2

**Bug/Patch fixes**

- Open sourcing the project.

### 4.0.1

**Bug/Patch fixes**

- Changing the property `esnext:main` in package.json to point to ES6 sources, instead of compiled files.

### 4.0.0

**Breaking change**

- Adding new option to the main table called "mixedContentImage".

## Todo

- Add tests for `CellUtils`, `ListCell` and `HugeTable`
- Add JS doc
- Try custom validation function to test `data` attribute based on the given schema
- Use `shape` validation on cellData
- Create an `EmptyCell` for empty cells
