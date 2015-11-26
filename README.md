### Todos

#### Complete for v2.2.7

- [x] link to user profile incorrect (showing logged in user instead)
- [x] error when no user logged in.
- [x] account / bio / profile not showing.
- [x] Login button off center.
- [x] Missing Visual indication for tag editing is saving
- [x] Missing Visual for when editing tutorial request is saving.
- [x] Content editor tabs are invisible (white on white)
- [x] Cleanup UX for spinners
- [x] Missing Visual indication needed for adding new solution/tutorial
   - [x] Make sure to scroll to newly added post when finished
   - [x] Use <Spinner /> for this
- [x] Clearout solution form on submit.

#### Pending Fixes

- [ ] Missing Visual indication of unapproved / approved tags
- [ ] Missing Visual for when internal update of link meta from web scraper.
- [ ] Separate vendor from bundles



#### Deferred Problems

- [ ] User profile updating custom data not working, need to check with stormpath.
- [ ] Tags are sometimes string, and sometimes array, this needs to be ironed out, and keep one type.



#### missing features

- [ ] toasts?

- [ ] deleted item ux
- [ ] Add vote functionality to the tut list view
- [ ] Add Category to db
- [ ] Add "Activity Stream" functionality
  - [ ] Using either websockets or standard xhr polling

- [ ] Add social network share function and og tags
- [ ] Add serverside rendering
- [ ] Avatar management (includes adding avatar upload form etc)
- [ ] Share buttons to comments
- [ ] Share buttons on sidebar
- [ ] User point system
- [ ] Add Validation to comment form.
- [ ] tooltips needed for buttons/links that are either truncated or use icons only.


#### Done




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


#### v2.2.6

The following items were fixed:

- [x] flags for comment should only be spam or offensive
- [x] flag x button reversed
- [x] admin/moderator not seeing edit buttons
- [x] edit controls on comment fixed
- [x] preload not showing on tut request submit
- [x] preload not showing on tut solution submit
- [x] edited by styling for comment  - comment-author .edit class
- [x] edited by styling for tutsolution & tutrequest - .user.editor
- [x] edits not updating when editing comment.
- [x] need visual indication edit is pending for comment
- [x] Indication for post editor missing
- [x] tags in select forms styling messed up
- [x] Visual indication for adding new comment.
- [x] tags css needs margin-top (24px)

#### v2.2.5

The following items were fixed:

- [x] preloader for "load more" button
- [x] tutorials button on tut request list not working
- [x] "no image" fallback for preview / link meta
- [x] need preloader for "load more" button
- [x] x tutorials button on tut request list not working
- [x] no image fallback

#### v2.2.4

- implmement minified version, optimized file-size.

- [x] Tut request form validation.
- [x] Validate form for tutorial solution
- [x] add flagging UX
- [x] add dropdown menus
- [x] Fix user info missing from account page
- [x] Fix tabs in account page (not displayed properly)
- [x] Fix reset password button in account page.


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



