const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser'),
    util: require.resolve('util/'),
    assert: require.resolve('assert/'),
  };
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      stream: 'stream-browserify',
      util: 'util',
      assert: 'assert'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );
  return config;
};
