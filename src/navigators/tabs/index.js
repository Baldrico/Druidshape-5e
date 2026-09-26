import React from 'react';
import PropTypes from 'prop-types';
import { Platform, NativeModules } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import r from 'rnss';
import { icon } from '../../api/util';
import Beasts from './beasts';
import Homebrew from './homebrew';
import Settings from './settings';

const createTabIcon = name => {
	const TabIcon = ({ tintColor }) => (
		<Icon name={icon(name)} size={r.vars().iconSizeLarge} color={tintColor} />
	);
	TabIcon.propTypes = { tintColor: PropTypes.string };
	return TabIcon;
};

const tabBarOnPress = ({ navigation, defaultHandler }) => {
	const { isFocused, state } = navigation;
	const { index, routes } = state;

	if (isFocused() && index === 0) {
		const stackNavigation = routes[0];
		stackNavigation?.params?.scrollToTop
			? stackNavigation.params.scrollToTop()
			: defaultHandler(navigation);
	} else {
		defaultHandler(navigation);
	}
};

const TabBarComponent = props => {
	const navBarHeight =
		Platform.OS === 'android' && NativeModules.NavBarModule
			? NativeModules.NavBarModule.navigationBarHeight || 0
			: 0;

	return (
		<BottomTabBar
			activeTintColor={r.vars().tabBarActiveTintColor}
			inactiveTintColor={r.vars().tabBarInactiveTintColor}
			style={{
				backgroundColor: r.vars().tabBarColor,
				borderTopColor: r.vars().dividerColor,
				paddingBottom: navBarHeight,
				height: 50 + navBarHeight
			}}
			{...props}
		/>
	);
};
TabBarComponent.propTypes = {
	screenProps: PropTypes.shape({
		state: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}).isRequired
};

export default createBottomTabNavigator(
	{
		Beasts: {
			screen: Beasts,
			navigationOptions: {
				tabBarIcon: createTabIcon('paw'),
				tabBarOnPress
			}
		},
		Homebrew: {
			screen: Homebrew,
			navigationOptions: {
				tabBarIcon: createTabIcon('construct'),
				tabBarOnPress
			}
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				tabBarIcon: createTabIcon('settings'),
				tabBarOnPress
			}
		}
	},
	{
		tabBarComponent: TabBarComponent
	}
);
