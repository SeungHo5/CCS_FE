module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@assets': './src/assets',
            '@pages': './src/pages',
            '@atoms': './src/components/atoms',
            '@molecules': './src/components/molecules',
            '@components': './src/components',
            '@organisms': './src/components/organisms',
            '@templates': './src/components/templates',
            '@apis': './src/components/apis',
            '@utils': './src/utils',
            '@services': './src/services',
            '@navigation': './src/navigation',  // 추가!
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          allowUndefined: false,
        },
      ],
    ],
  };
};