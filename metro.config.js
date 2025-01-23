const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  server: {
    host: '0.0.0.0',
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
