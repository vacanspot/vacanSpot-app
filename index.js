/**
 * @format
 */

import {AppRegistry} from 'react-native';
import codePush from 'react-native-code-push';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () =>
  codePush({
    updateDialog: {
      title: '알림',
      optionalUpdateMessage: '새로운 버전이 출시되었습니다.\n설치하시겠습니까?',
      optionalIgnoreButtonLabel: '건너뛰기',
      optionalInstallButtonLabel: '설치',
    },
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
    installMode: codePush.InstallMode.IMMEDIATE,
  })(App),
);
