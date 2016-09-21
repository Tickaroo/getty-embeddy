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

    this.options.oembedEndpoint = options.oembedEndpoint || '//embed.gettyimages.com/oembed?url=';
    this.options.parentEl = options.parentEl || document;
    this.options.selectorClass = options.selectorClass || 'js-getty-embeddy-el';
    this.options.dataAttr = options.dataAttr || 'getty-embeddy-id';
    this.options.base64loadingImg = options.base64loadingImg || 'data:image/gif;base64,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'; // jshint ignore:line
  }

  function embedTimeout(_this, i, el) {
    window.setTimeout(
      function () {
        _this.embed(el);
      },
      100 * i
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

    if (el && this.options.oembedEndpoint) {
      if (typeof imageId !== 'string') {
        if (el.getAttribute && this.options.dataAttr && el.getAttribute('data-' + this.options.dataAttr)) {
          imageId = el.getAttribute('data-' + this.options.dataAttr);
        } else {
          return false;
        }
      }
      url = this.options.oembedEndpoint + encodeURIComponent('//www.gettyimages.com/license/' + imageId);

      var embedIndex = this.embeds.push(new XMLHttpRequest());
      embedIndex = embedIndex - 1;
      var embedAjax = this.embeds[embedIndex];
      if (el.getAttribute('data-getty-embeddy-loading') !== 'true') {
        el.setAttribute('data-getty-embeddy-loading', 'true');
        el.innerHTML = "<img src='" + this.options.base64loadingImg + "'></>";
      }
      embedAjax.onreadystatechange = function (e) {
        var responseText, oEmbedObj;
        if (embedAjax.readyState === 4 && embedAjax.status === 200) {
          responseText = embedAjax.responseText || '{}';
          try {
            oEmbedObj = JSON.parse(responseText);
          } catch (e) {
            window.alert(e);
            oEmbedObj = {};
          }
          try {
            if (el && oEmbedObj && oEmbedObj.html) {
              el.innerHTML = oEmbedObj.html;
              el.removeAttribute('data-getty-embeddy-loading');
              el.setAttribute('data-getty-embeddy-loaded', 'true');
            }
          } catch (e) {
            console.log(e);
          }
        }
      };
      embedAjax.open("GET", url, true);
      embedAjax.send();
      return true;
    } else {
      return false;
    }
  };
  /**
   * [embedAll scans and embeds all results]
   */
  GettyEmbeddy.prototype.embedAll = function () {
    var els = this.options.parentEl.getElementsByClassName(this.options.selectorClass);
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.getAttribute('data-getty-embeddy-loaded') !== "true") {
        embedTimeout(this, i, el);
      }
    }
  };

  // GettyEmbeddy.prototype.close = GettyEmbeddy.prototype.destroy = function destroy() {
  //   this.options.onBeforeClose();
  //   this.options.container.removeChild(this.elems.wrapper);
  // };


  module.exports = GettyEmbeddy;
