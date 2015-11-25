### Todos


#### fixes

- [ ] admin/moderator not seeing edit buttons
- [ ] admin/moderator not seeing tag vote buttons
- [ ] flag x button reversed
- [ ] link to user profile incorrect (showing logged in user instead)
- [ ] User avatar missing

#### missing features

- [ ] Add vote functionality to the tut list view
- [ ] Add Category to db
- [ ] Add "Activity Stream" functionality
  -  [ ] Using either websockets or standard xhr polling

- [ ] add social network share function and og tags
- [ ] add serverside rendering
- [ ] Avatar management
- [ ] Share buttons to comments
- [ ] Share buttons on sidebar
- [ ] User point system


#### Done

- [x] need preloader for "load more" button
- [x] x tutorials button on tut request list not working
- [x] no image fallback
- [x] Tut request form validation.
- [x] Validate form for tutorial solution
- [x] add flagging UX
- [x] add dropdown menus
- [x] Fix user info missing from account page
- [x] Fix tabs in account page (not displayed properly)
- [x] Fix reset password button in account page.



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


### Contributors

- Matt McFarland @docodemore
- Marko Bolliger


### Changelog

#### v2.2.5

- Add preloader for "load more" button
- Fixed tutorials button on tut request list not working
- Fixed "no image" fallback for preview / link meta

#### v2.2.4

- implmement minified version, optimized file-size.


#### v2.2.0

- implements flagging ux

#### v2.1.0

- Implmement new visual designs from Marko.


#### v2.0.1

- Add link to dist/style/main.css (fix)

#### v2.0.0

Accidentally incremented major version too high.

#### v0.2.0

- Add unit testing with jest

#### v0.1.0

- cant remember.


Breaking changes.

- Swapped out LESS with SASS to add Marko's visual design patterns.
- Refactored to use `public`, `views`, and separate `dist/js` and `dist/style`



