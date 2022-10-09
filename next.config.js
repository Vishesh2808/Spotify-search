const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os:false , path:false };
    return config;
  },
  Plugin:[new Dotenv()]
};