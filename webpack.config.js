const path = require('path');

module.exports = {
  // Other Webpack configurations...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};
