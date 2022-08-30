import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

export * from './src/ApiSample';

AppRegistry.registerComponent(appName, () => App);
