module.exports = function (env, argv) {
  const environment = env && env.production ? 'production' : 'development';
  console.log('Building for ' + `*** ${environment.toUpperCase()} ***`);

  return {
    mode: environment,
    entry: './src/index.js',
    target: 'web',
    devtool: 'source-map',
    output: {
      path: __dirname + '/dist',
      filename: 'index.js',
      library: 'trace',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
  };
};
