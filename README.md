### Exports

tw-server relies on the following directories:

- /dist/js
- /dist/style
- /public
- /views

Both `/dist/js` and `/dist/style` are bundled files from gulp.

`public` directory is served static via server as root

`views` directory is used from `handlebars` view engine on server.

### Installation

`npm install @mattmcfarland/tw-client`

### Changelog

#### v1.0.0

Breaking changes.

- Swapped out LESS with SASS to add Marko's visual design patterns.
- Refactored to use `public`, `views`, and separate `dist/js` and `dist/style`


#### v0.2.0

- Add unit testing with jest

#### v0.1.0

- cant remember.

### Contributors

- Matt McFarland @docodemore
- Marko Bolliger
