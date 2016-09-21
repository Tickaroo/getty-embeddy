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
  parent: undefined,                 // undefined to search in whole document, selector or element to use as parent
  selectorClass: 'js-getty-embeddy-el',  // which class will be processed
  dataAttr: 'getty-embeddy-id'       // which data attr will hold the GettyImages image id
});

gettyEmbeddy.embedAll();
gettyEmbeddy.embed(el); //will check el's data attributes for dataAttr to get image id
// gettyEmbeddy.embed(el, gettyId); //TODO
// gettyEmbeddy.getHtml(gettyId); //TODO
```
