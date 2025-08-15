// index.js  (프로젝트 루트)

// ✅ 항상 최상단에!
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {enableScreens} from 'react-native-screens';
enableScreens(false);

import {AppRegistry, Platform, UIManager} from 'react-native';

// ANDROID: RN 기본 LayoutAnimation + Reanimated 레이아웃 애니메이션 모두 차단
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(false);
    }
    // Reanimated 글로벌 차단 플래그
    // (중요) App import "이전"에 설정되어야 함
    // @ts-ignore
    global.__reanimatedLayoutAnimationDisabled = true;

    try {
        const Reanimated = require('react-native-reanimated');
        if (typeof Reanimated.enableLayoutAnimations === 'function') {
            Reanimated.enableLayoutAnimations(false);
        }
    } catch {}
}

// 디버깅용: 실제로 꺼졌는지 로그로 확인
// 로그에 아래 두 줄이 보이면 엔트리 적용 OK
//   Reanimated LA disabled: true  hasAPI: true/false
try {
    const Reanimated = require('react-native-reanimated');
    // @ts-ignore
    console.log(
        'Reanimated LA disabled:',
        // @ts-ignore
        global.__reanimatedLayoutAnimationDisabled === true,
        'hasAPI:',
        typeof Reanimated.enableLayoutAnimations === 'function',
    );
} catch {}

import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
