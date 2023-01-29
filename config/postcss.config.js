module.exports = (config) => {
  const fileName = config.file.basename.split('.scss')[0]
  return {
    map: false,
    parser: 'postcss-scss',
    output: `./${fileName}.css`,
    plugins: [
      require('postcss-advanced-variables')(),
      require('postcss-nested')(),
      require('postcss-sort-media-queries')(),
      require('postcss-strip-inline-comments')(),
      require('autoprefixer')(),
    ],
  }
}
