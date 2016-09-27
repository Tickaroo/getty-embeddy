  "use strict";

  // getty-embeddy.js
  // Ahmed Hassanein - 2016

  /**
   * GettyEmbeddy
   * @constructor
   * @param {object} options
   */
  function GettyEmbeddy(options) {
    options = options || {};
    this.options = {};
    this.embeds = [];

    this.options.parentEl = options.parentEl || document;
    this.options.selectorClass = options.selectorClass || 'js-getty-embeddy-el';
    this.options.dataAttr = options.dataAttr || 'getty-embeddy-id';
    this.options.loaderCss = options.loaderCss || 'margin:auto;display:block;top:50%;position:relative;';

    if (options.loaderImgSrc === false || typeof options.loaderImgSrc === 'string') {
      this.options.loaderImgSrc = options.loaderImgSrc;
    } else {
      this.options.loaderImgSrc = 'data:image/gif;base64,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'; // jshint ignore:line
    }

    if (typeof options.onLoadFail === 'function') {
      this.options.onLoadFail = options.onLoadFail;
    } else {
      if (typeof options.defaultOnFailHtml === 'string') {
        this.options.defaultOnFailHtml = options.defaultOnFailHtml;
      } else {
        this.options.defaultOnFailHtml = '<span>embedding failed reason:__REASON__</span>';
      }
      this.options.onLoadFail = function (el, reason) {
        if (el && reason && this.options.defaultOnFailHtml && this.options.defaultOnFailHtml.replace) {
          el.innerHTML = this.options.defaultOnFailHtml.replace('__REASON__', reason);
        }
        console.warn('GettyEmbeddy - onLoadFail was called reason:', reason, ' element:', el);
      };
    }

    if (typeof options.embedDelayDuration === 'number') {
      this.options.embedDelayDuration = options.embedDelayDuration;
    } else {
      this.options.embedDelayDuration = 100;
    }
  }

  function embedTimeout(gettyEmbeddy, i, el) {
    setTimeout(
      function () {
        gettyEmbeddy.embed(el);
      },
      gettyEmbeddy.options.embedDelayDuration * i // jshint ignore:line
    );
  }

  /**
   * embeds single oEmbed result into an element
   * @param  {HTMLElement} el - HTMLElement node to replace with a loader then later with oEmbed html result
   * @param  {?String} imageId - GettyImages embed Id
   * @return {boolean}  - true on success, false otherwise
   */
  GettyEmbeddy.prototype.embed = function (el, imageId) {
    var url;

    if (el) {
      if (typeof imageId !== 'string') {
        if (el.getAttribute && this.options.dataAttr && el.getAttribute('data-' + this.options.dataAttr)) {
          imageId = el.getAttribute('data-' + this.options.dataAttr);
          if (imageId.length < 3) {
            console.warn('GettyEmbeddy - invalid imageId:', imageId, ' for element:', el);
            this.options.onLoadFail.call(this, el, 'no_image_id');
            return false;
          }
        } else {
          console.warn('GettyEmbeddy - can\'t find the imageid attribute:', 'data-' + this.options.dataAttr, ' for element:', el);
          this.options.onLoadFail.call(this, el, 'no_image_id');
          return false;
        }
      }
      url = '//embed.gettyimages.com/oembed?url=' + encodeURIComponent('//www.gettyimages.com/details/' + imageId);
      if (el.getAttribute('data-getty-embeddy-loaded') !== "true") {
        el.setAttribute('data-getty-embeddy-loading', 'true');
        this.startLoader(el);
      }
      var embedAjax = new XMLHttpRequest();
      this.embeds.push(embedAjax);
      var _this = this;
      embedAjax.onreadystatechange = function () {
        // console.log(imageId, embedAjax.readyState, embedAjax.status);
        var responseText, jsonResponse;
        if (embedAjax.readyState === 4) {
          if (embedAjax.status >= 200 && embedAjax.status < 400) {
            responseText = embedAjax.responseText || '{}';
            jsonResponse = JSON.parse(responseText);
            if (el && jsonResponse && jsonResponse.html) {
              el.innerHTML = jsonResponse.html;
              el.removeAttribute('data-getty-embeddy-loading');
              el.setAttribute('data-getty-embeddy-loaded', 'true');
            } else {
              if (typeof _this.options.onLoadFail === 'function') {
                _this.options.onLoadFail.call(_this, el, 'invalid_response');
              }
            }
          } else if (embedAjax.status !== 0) {
            if (typeof _this.options.onLoadFail === 'function') {
              _this.options.onLoadFail.call(_this, el, 'connection_error');
            }
          }
        }
      };
      embedAjax.open("GET", url, true);
      embedAjax.send();
      return true;
    } else {
      console.warn('GettyEmbeddy - calling embed without a valid element:', el);
      return false;
    }
  };
  /**
   * [embedAll scans and embeds all results]
   */
  GettyEmbeddy.prototype.embedAll = function () {
    if (this.options.parentEl && this.options.parentEl.getElementsByClassName) {
      var els = this.options.parentEl.getElementsByClassName(this.options.selectorClass);
      if (els.length > 0) {
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          if (el.getAttribute('data-getty-embeddy-loaded') !== "true") {
            el.setAttribute('data-getty-embeddy-loading', 'true');
            this.startLoader(el);
            embedTimeout(this, i, el);
          }
        }
      } else {
        console.warn('GettyEmbeddy - no embeddable elements were found');
      }
    }
  };

  GettyEmbeddy.prototype.startLoader = function (el) {
    if (typeof this.options.loaderCss === 'string' && typeof this.options.loaderImgSrc === 'string') {
      el.innerHTML = "<img style='" + this.options.loaderCss + "' src='" + this.options.loaderImgSrc + "'/>";
    }  
  };

  module.exports = GettyEmbeddy;
