 /*jshint -W020 */
 var expect = require('chai').expect;
 var GettyEmbeddy = require('../src/getty-embeddy.js');
 var jsdom = require('jsdom');

 function xmlReqGen(options) {
   options = options || {};
   var _XMLHttpRequest = function () {};
   // _XMLHttpRequest();
   _XMLHttpRequest.prototype.open = function () {};
   _XMLHttpRequest.prototype.send = function () {
     this.status = options.status || 200;
     this.readyState = options.readyState || 4;
     this.responseText = options.responseText || '{"html":"<div>works</div>"}';
     if (options.delay) {
       setTimeout(function () {
         this.onreadystatechange();
       }, options.delay);
     } else {
       this.onreadystatechange();
     }
   };
   return _XMLHttpRequest;
 }

 beforeEach(function () {
   global.XMLHttpRequest = xmlReqGen();
 });

 describe('GettyEmbeddy', function () {
   it('has valid default options', function (done) {
     document = jsdom.jsdom();
     var gettyEmbeddy = new GettyEmbeddy();
     expect(gettyEmbeddy.embeds).to.be.empty; // jshint ignore:line
     expect(gettyEmbeddy.options.loaderImgSrc).to.be.a('string');
     expect(gettyEmbeddy.options.dataAttr).to.eql('getty-embeddy-id');
     expect(gettyEmbeddy.options.selectorClass).to.eql('js-getty-embeddy-el');
     expect(gettyEmbeddy.options.parentEl).to.deep.equal(document);
     done();
   });
 });

 describe('GettyEmbeddy embedAll()', function () {
   it('works with default options', function (done) {
     document = jsdom.jsdom('<div id="test" class="js-getty-embeddy-el" data-getty-embeddy-id="83454805">Holder...</div>');
     var gettyEmbeddy = new GettyEmbeddy();
     gettyEmbeddy.embedAll();
     setTimeout(function () {
       console.log(document.getElementById("test").innerHTML);
       expect(document.getElementById("test").innerHTML).to.contain('<div>works</div>');
       done();
     }, 10);
   });

   it('fails if no embed id', function (done) {
     document = jsdom.jsdom('<div id="test" class="js-getty-embeddy-el">Holder...</div>');
     var gettyEmbeddy = new GettyEmbeddy();
     gettyEmbeddy.embedAll();
     setTimeout(function () {
       console.log(document.getElementById("test").innerHTML);
       expect(document.getElementById("test").innerHTML).to.contain('<span>embedding failed reason:no_image_id</span>');
       done();
     }, 10);
   });

   it('doesnt break if no elements', function (done) {
     document = jsdom.jsdom('<div id="test">Holder...</div>');
     var gettyEmbeddy = new GettyEmbeddy();
     gettyEmbeddy.embedAll();
     setTimeout(function () {
       console.log(document.getElementById("test").innerHTML);
       expect(document.getElementById("test").innerHTML).to.contain('Holder...');
       done();
     }, 10);

   });

   it('testing different options', function (done) {
     document = jsdom.jsdom(
       '<div id="parent">' +
       '  <div id="id1" class="cls1" data-g="83454805">x</div>' +
       '  <div id="id3" class="cls1" >no id</div>' +
       '  <div id="id4" class="cls1" data-g="603705212">x</div>' +
       '  <div id="id5" class="cls2" data-g="603563138">x</div>' +
       '</div>' +
       '<div id="id6" class="cls1" data-g="603557788">no parent</div>' +
       '<div id="id7" class="cls1" data-g="511550168">no parent</div>' +
       '<div id="id8" class="cls1">nothing</div>');

     var gettyEmbeddy = new GettyEmbeddy({
       parentEl: document.getElementById('parent'),
       selectorClass: 'cls1',
       dataAttr: 'g',
     });
     gettyEmbeddy.embedAll();
     setTimeout(function () {
       expect(document.getElementById("id1").innerHTML).to.contain('<div>works</div>');
       expect(document.getElementById("id3").innerHTML).to.contain('<span>embedding failed reason:no_image_id</span>');
       expect(document.getElementById("id4").innerHTML).to.contain('<div>works</div>');
       expect(document.getElementById("id5").innerHTML).to.contain('x');
       expect(document.getElementById("id6").innerHTML).to.contain('no parent');
       expect(document.getElementById("id7").innerHTML).to.contain('no parent');
       expect(document.getElementById("id8").innerHTML).to.contain('nothing');
       done();
     }, 1000);

   });

   it('should fail on 404', function (done) {
     document = jsdom.jsdom('<div id="id1" class="js-getty-embeddy-el" data-getty-embeddy-id="83454805">x</div>');
     global.XMLHttpRequest = xmlReqGen({
       status: 404
     });
     var gettyEmbeddy = new GettyEmbeddy();
     gettyEmbeddy.embedAll();
     setTimeout(function () {
       expect(document.getElementById("id1").innerHTML).to.contain('<span>embedding failed reason:connection_error</span>');
       done();
     }, 1000);

   });

 });

 describe('GettyEmbeddy embed()', function () {

   it('shows loader', function (done) {
     document = jsdom.jsdom(
       '  <div id="id1" class="js-getty-embeddy-el" data-getty-embeddy-id="83454805">x</div>' +
       '  <div id="id3" class="cls1" >no id</div>');
     global.XMLHttpRequest = xmlReqGen({
       delay: 200
     });
     var gettyEmbeddy = new GettyEmbeddy();
     gettyEmbeddy.embed(document.getElementById("id1"));
     expect(document.getElementById("id1").innerHTML).to.contain('<img style="margin:auto;display:block;top:50%;position:rel');
     expect(document.getElementById("id3").innerHTML).to.contain('no id');
     done();
   });
   
      it('embeds', function (done) {
        document = jsdom.jsdom(
          '  <div id="id1" class="js-getty-embeddy-el" data-getty-embeddy-id="83454805">x</div>' +
          '  <div id="id3" class="cls1" >no id</div>');
        var gettyEmbeddy = new GettyEmbeddy();
        gettyEmbeddy.embed(document.getElementById("id1"));
        expect(document.getElementById("id1").innerHTML).to.contain('works');
        expect(document.getElementById("id3").innerHTML).to.contain('no id');
        done();
      });
 });
