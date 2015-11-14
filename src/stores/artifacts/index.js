jest.dontMock('alt');
jest.dontMock('../../alt');
jest.dontMock('../IndexStore');
jest.dontMock('../../actions/IndexActions');

exports.IndexStore = require('../IndexStore');
