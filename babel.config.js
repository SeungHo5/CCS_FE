module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // Reanimated는 항상 맨 아래에 두라는 권장
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@assets': './src/assets',
        '@pages': './src/pages',
        '@atoms': './src/components/atoms',
        '@molecules': './src/components/molecules',
        '@organisms': './src/components/organisms',
        '@templates': './src/components/templates',
        '@apis': './src/components/apis',
        '@stores': './src/stores',
        '@navigation': './src/navigation',
        '@utils': './src/utils',
      },
      extensions: ['.js', '.jsx', '.json'],
    }],
    'react-native-reanimated/plugin',
  ],
};