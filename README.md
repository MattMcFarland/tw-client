### Todos


#### Planned for v2.5.x:

- [ ] Avatar management (includes adding avatar upload form etc)
- [ ] User point system
- [ ] deleted item ux
- [ ] ensure 3rd party vendor license compliance.
- [ ] user history is too long
- [ ] user history ux needs work
- [ ] user history sorting incorrectly (ascending instead of descending)


#### Bugs:
- [ ] firefox cant login
- [ ] activity stream not working in production server.
- [ ] activity stream grows without limits.
- [ ] share button urls not wokring properly. appear to be set though.
- [ ] tutorial solutions are not sorting by votes.
- [ ] comment validation errors persisting and showing on other comment forms
- [ ] comment validation not working on solution.
- [ ] User profile updating custom data not working, need to check with stormpath.

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


#### v2.4.1

Critical errors fixed:

- [x] firefox user cant login - dont use elem.innertext xD
- [x] non-admin error 500 auth - fixed

#### v2.4.0

Following features added:

- [x] tooltips needed for buttons/links that are either truncated or use icons only.
- [x] Add "Activity Stream" functionality with socket.io and local storage

Bug fixes:

- [x] widget visuals are now off (not enough top margin for activity, sharing buttons squished togethe
- [x] voting not working when in tutorial list (again)


#### v2.3.0

Following features added:

- [x] Add vote functionality to the tut list view
- [x] Share buttons on sidebar
- [x] Add social network share functions
- [x] Share buttons to comments
- [x] Add Validation to comment form.
- [x] Add Category to db
- [x] Add Catergory filtering to UX
- [x] Add Category Selection to Form
- [x] Add Breadcrumb navigation



#### v2.2.8

The following items were fixed:

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
- [x] Missing Visual for when internal update of link meta from web scraper.
- [x] downvoted tags can be added back (this might be OK) - feature not a bug
- [x] Missing Visual indication of approving / unapproving tag - fixed with optimistic update
- [x] Missing validation on edit tags
- [x] duplicate tag names causing issues
- [x] Separate vendor from bundles



#### v2.2.6-7

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

#### v2.2.1-4

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

Breaking changes.

- Swapped out LESS with SASS to add Marko's visual design patterns.
- Refactored to use `public`, `views`, and separate `dist/js` and `dist/style`

Accidentally incremented major version too high.

#### v0.2.0

- Add unit testing with jest

#### v0.1.0

- cant remember.





