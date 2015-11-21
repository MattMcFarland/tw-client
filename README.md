### Todos

- [ ] add dropdown menus
- [ ] Validate form for tutorial solution
- [ ] x tutorials button on tut request list not working
- [ ] need preloader for "load more" button
- [ ] admin/moderator not seeing edit buttons
- [ ] admin/moderator not seeing tag vote buttons
- [ ] Fix user info missing from account page
- [ ] Fix tabs in account page (not displayed properly)
- [ ] Fix reset password button in account page.

- [ ] Add vote functionality to the tut list view
- [ ] Add Category to db
- [ ] Add "Activity Stream" functionality
- [ ] add social network share function and og tags


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

#### v2.0.1

- Add link to dist/style/main.css (fix)

#### v2.0.0

Accidentally incremented major version too high.


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
