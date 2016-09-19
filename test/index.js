var expect = require('chai').expect;
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
    var gettyEmbeddy = new GettyEmbeddy();
    expect(gettyEmbeddy.embeds).to.be.empty;// jshint ignore:line
    expect(gettyEmbeddy.options.base64loadingImg).to.be.a('string');
    expect(gettyEmbeddy.options.dataAttr).to.eql('getty-embeddy-id');
    expect(gettyEmbeddy.options.selectorClass).to.eql('js-getty-embeddy-el');
    expect(gettyEmbeddy.options.oembedEndpoint).to.eql('http://embed.gettyimages.com/oembed?url=');
    expect(gettyEmbeddy.options.parentEl).to.deep.equal(jsdomDocument);
    done();
  });

});
