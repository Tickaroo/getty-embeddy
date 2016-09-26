# getty-embeddy

[![npm version](https://badge.fury.io/js/getty-embeddy.svg)](https://www.npmjs.com/package/getty-embeddy) [![Build Status](https://travis-ci.org/Tickaroo/getty-embeddy.svg?branch=master)](https://travis-ci.org/Tickaroo/getty-embeddy) [![codecov.io](https://codecov.io/github/Tickaroo/getty-embeddy/coverage.svg?branch=master)](https://codecov.io/github/Tickaroo/getty-embeddy?branch=master)

Embed Gettyimages photos (iFrame) into your website using Gettyimages's native oEmbed endpoint.

the concept was as lightweight and direct as possible for smaller footprint so if you want a power horse with > 500 LOC check something like [embedza](https://www.npmjs.com/package/embedza), [url-embed](https://github.com/mkopit/url-embed) or [jquery-oembed-all](https://github.com/starfishmod/jquery-oembed-all).
However, make sure they support Gettyimages!

Feedback and PRs are welcomed.

## you made a library for THAT! no chance, I will create my Iframe link on my own!
well, you can't -.-

unlike other social services out there, GettyImages kinda forces you to use oEmbed (or their API) to get the working iframe link.

However, if you managed to generate the url on the fly, please tell me!

## Install

```bash
$ npm install --save getty-embeddy
```

## Usage

```javascript
var GettyEmbeddy = require('getty-embeddy');
// all options are optional with the default values shown here:
var gettyEmbeddy = new GettyEmbeddy({
  // undefined to search in whole document or an element to use as parent for better performance (recommended!)
  parentEl: undefined,    
  // all elements with this class will be processed          
  selectorClass: 'js-getty-embeddy-el',
  // which data attr will hold the GettyImages image id
  dataAttr: 'getty-embeddy-id',
  //provide another base64 encoded gif loader or false to disable
  loaderGifBase64: 'data:image/gif;base64,R0lGOD....[a small gif loader encoded in base64]',
  // a function to run if embedding fails (image was removed or invalid id etc...)
  // el is the affected element and reason is a string, one of 'no_image_id','invalid_response','connection_error'
  onLoadFail: function (el, reason) {
    if (el) {
      el.innerHTML = '<span>embedding failed, reason: ' + reason + '</span>';
    }
  },
  // the css to use for the loader element
  defaultOnFailHtml: '<span>embedding failed</span>',
  // the css to use for the loader element
  loaderCss: 'margin:auto;display:block;top:50%;position:relative;',
  // the time (in milliseconds) to delay the embedAll process for better performance, set to 0 to disable
  embedDelayDuration: 100,
});

gettyEmbeddy.embedAll(); // will scan parentEl for possible embeds and load them (with the 'embedDelayDuration' delay between each embed)
gettyEmbeddy.embed(el); //will check el's data attributes for dataAttr to get image id
gettyEmbeddy.embed(el, '604533586'); // you can provide the id directly if the element doesn't have one or if you need to override it
// gettyEmbeddy.getHtml(gettyId); //TODO
```
