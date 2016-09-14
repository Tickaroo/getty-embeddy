// var expect = require('chai').expect;
var GettyEmbeddy = require('../src/index.js');
var jsdomDocument = require('jsdom').jsdom();
global.document = jsdomDocument;
global.window = document.defaultView;

var elem;

beforeEach(function () {
  elem = jsdomDocument.createElement('div');
});


describe('GettyEmbeddy', function () {
  // this.slow(200);
  it('doesnt expload in your face', function (done) {
    var gettyEmbeddy = GettyEmbeddy();// jshint ignore:line
    // expect(elem.innerHTML).to.contain('roo-pic-2.jpg');
    done();
  });
});
