module.exports = {
  entry: './src/getty-embeddy.js',
  output: {
    filename: 'getty-embeddy.js',
    path: './dist',
    library: 'GettyEmbeddy',
    libraryTarget: 'var'
  }
};
