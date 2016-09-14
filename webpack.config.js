module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'gettyEmbeddy.js',
    path: './dist',
    library: 'GettyEmbeddy',
    libraryTarget: 'var'
  }
};
