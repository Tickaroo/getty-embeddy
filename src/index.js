function GettyEmbeddy(options) {
  options = options || {};

  this.options = {};
  this.embeds = [];
  this.options.parent = options.parent;
  this.options.selectorClass = options.selector || 'js-getty-embeddy-el';
  this.options.dataAttr = options.dataAttr || 'gettyEmbeddyId';
  this.options.base64loadingImg = 'data:image/gif;base64,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';  // jshint ignore:line
}

GettyEmbeddy.prototype.embedAll = function () {
  var els = document.getElementsByClassName(this.options.selectorClass);
  // defining the function outside the loop is better performance
  var loaderFn = function (GettyEmbeddy, i, el) {
    window.setTimeout(
      function () {
        GettyEmbeddy.embed(el);
      },
      100 * i
    );
  };
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    this.startLoader(el);
    (loaderFn)(this, i, el);
  }
};

GettyEmbeddy.prototype.embed = function (el) {
  if (el) {
    var serviceEndpoint, url, imageId;
    serviceEndpoint = 'http://embed.gettyimages.com/oembed?url=';
    if (el.dataset && this.options.dataAttr && el.dataset[this.options.dataAttr]) {
      imageId = el.dataset[this.options.dataAttr];
      url = serviceEndpoint + encodeURIComponent('http://www.gettyimages.com/license/' + imageId);
      this.fetchOembed(url, el);
    }
  }
};

GettyEmbeddy.prototype.startLoader = function (el) {
  if (el.dataset.gettyEmbeddyLoading !== true) {
    el.dataset.gettyEmbeddyLoading = true;
    el.innerHTML = "<img src='" + this.options.base64loadingImg + "'></>";
  }
};

GettyEmbeddy.prototype.fetchOembed = function (url, el) {
  var embedId = this.embeds.push(new XMLHttpRequest());
  embedId = embedId - 1;
  var embedAjax = this.embeds[embedId];
  (function (embedAjax, embedId, GettyEmbeddy, el) {
    embedAjax.onreadystatechange = function () {
      var responseText, oEmbedObj;
      if (this.readyState === 4 && this.status === 200) {
        responseText = this.responseText || '{}';
        try {
          oEmbedObj = JSON.parse(responseText);
        } catch (e) {
          window.alert(e);
          oEmbedObj = {};
        }
        GettyEmbeddy._onOembedLoad(embedAjax, embedId, oEmbedObj, el);
      }
    };
    embedAjax.open("GET", url, true);
    embedAjax.send();
  })(embedAjax, embedId, this, el);
};

GettyEmbeddy.prototype._onOembedLoad = function (embedAjax, embedId, oEmbed, el) {
  try {
    if (el && oEmbed && oEmbed.html) {
      el.innerHTML = oEmbed.html;
      el.dataset.gettyEmbeddyLoading = undefined;
    }
  } catch (e) {
    console.log(e);
  }
};

// GettyEmbeddy.prototype.getHtml = function (html) {};

GettyEmbeddy.prototype.close = GettyEmbeddy.prototype.destroy = function destroy() {
  this.options.onBeforeClose();
  this.options.container.removeChild(this.elems.wrapper);
};

module.exports = GettyEmbeddy;
