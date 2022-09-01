/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const kakaoSdkProjects = ['common', 'auth', 'user', 'friend', 'talk', 'share', 'story', 'navi'];
const extraNodeModules = kakaoSdkProjects.reduce((context, project) => {
  context[`react-native-kakao-sdk-${project}`] = path.join(__dirname, '/..', project);
  return context;
}, {});
const watchFolders = Object.keys(extraNodeModules).map(key => extraNodeModules[key]);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};
