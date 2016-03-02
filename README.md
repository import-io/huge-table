# HugeTable

Table component to handle huge sets of data, based on Facebook's FixedDataTable.

## How to use it

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
- **schema** - Takes an array of objects defining the name of particular fields to look for inside teh `data` array, and their type of data, which will tell the table which Cell type to use for displaying a particular column of data. Check `examples` directory for exemplary set of data and schema files.
- **options.height** - Height of the table component,
- **options.width** - Width of the table component,
- **options.mixedContentImage** - Function that can handle mixed content warnings for images being loaded inside the table. Function will be invoked with image URL, and allows developers to decide what do do when page is loaded for example with `https`, and image url has `http` protocol. Check `examples` directory for an example on how to use this.
- **options.tableScrolled** - Function that will be called whenever the table has been scrolled. It can be used to hook to the scrolling of the table on mobile devices, and use it to adjust the view around the table according to the table scrolling.

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
