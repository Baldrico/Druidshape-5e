import { Platform, NativeModules, StatusBar } from 'react-native';
import { fromRight } from 'react-navigation-transitions';
import { isIphoneX } from 'react-native-iphone-x-helper';
import r from 'rnss';

const getStatusBarHeight = () => {
	if (Platform.OS === 'android') {
		const nativeHeight = NativeModules.NavBarModule
			? NativeModules.NavBarModule.statusBarHeight
			: 0;
		return nativeHeight || StatusBar.currentHeight || 24;
	}
	return 0;
};

export default {
	transitionConfig: Platform.OS === 'android' ? () => fromRight() : null,
	defaultNavigationOptions: () => {
		const statusBarHeight = getStatusBarHeight();
		return {
			headerStyle: {
				backgroundColor: r.vars().headerColor,
				elevation: 0,
				borderBottomWidth: 0,
				...(Platform.OS === 'android'
					? {
							paddingTop: statusBarHeight,
							height: 56 + statusBarHeight
					  }
					: {}),
				...(isIphoneX() ? { height: 44 } : {})
			},
			headerTintColor: r.vars().headerTextColor,
			gesturesEnabled: true
		};
	}
};
