const ReactNative = require('react-native');
const DeprecatedProps = require('deprecated-react-native-prop-types');

const {
	ColorPropType,
	EdgeInsetsPropType,
	ImagePropTypes,
	PointPropType,
	TextInputPropTypes,
	TextPropTypes,
	ViewPropTypes
} = DeprecatedProps;

const fallbackStyle = { style: () => null };

if (ReactNative.Text) {
	try {
		ReactNative.Text.propTypes = TextPropTypes || fallbackStyle;
	} catch (e) {}
}
if (ReactNative.View) {
	try {
		ReactNative.View.propTypes = ViewPropTypes || fallbackStyle;
	} catch (e) {}
}
if (ReactNative.TextInput) {
	try {
		ReactNative.TextInput.propTypes = TextInputPropTypes || fallbackStyle;
	} catch (e) {}
}
if (ReactNative.Image) {
	try {
		ReactNative.Image.propTypes = ImagePropTypes || fallbackStyle;
	} catch (e) {}
}

// Polyfill Linking.removeEventListener removed in modern React Native
if (ReactNative.Linking && !ReactNative.Linking.removeEventListener) {
	ReactNative.Linking.removeEventListener = function (type, handler) {};
}

// Polyfill Dimensions.removeEventListener and Dimensions.addEventListener removed/changed in modern React Native
if (ReactNative.Dimensions) {
	const dimListeners = new Map();
	const originalAdd = ReactNative.Dimensions.addEventListener;
	if (originalAdd) {
		ReactNative.Dimensions.addEventListener = function (type, handler) {
			const sub = originalAdd.call(ReactNative.Dimensions, type, handler);
			dimListeners.set(handler, sub);
			return sub;
		};
	}
	if (!ReactNative.Dimensions.removeEventListener) {
		ReactNative.Dimensions.removeEventListener = function (type, handler) {
			const sub = dimListeners.get(handler);
			if (sub && sub.remove) {
				sub.remove();
				dimListeners.delete(handler);
			}
		};
	}
}

// Polyfill AppState.removeEventListener
if (ReactNative.AppState) {
	const appStateListeners = new Map();
	const originalAppStateAdd = ReactNative.AppState.addEventListener;
	if (originalAppStateAdd) {
		ReactNative.AppState.addEventListener = function (type, handler) {
			const sub = originalAppStateAdd.call(ReactNative.AppState, type, handler);
			appStateListeners.set(handler, sub);
			return sub;
		};
	}
	if (!ReactNative.AppState.removeEventListener) {
		ReactNative.AppState.removeEventListener = function (type, handler) {
			const sub = appStateListeners.get(handler);
			if (sub && sub.remove) {
				sub.remove();
				appStateListeners.delete(handler);
			}
		};
	}
}

// Polyfill BackHandler.removeEventListener
if (ReactNative.BackHandler) {
	const backListeners = new Map();
	const originalBackAdd = ReactNative.BackHandler.addEventListener;
	if (originalBackAdd) {
		ReactNative.BackHandler.addEventListener = function (type, handler) {
			const sub = originalBackAdd.call(ReactNative.BackHandler, type, handler);
			backListeners.set(handler, sub);
			return sub;
		};
	}
	if (!ReactNative.BackHandler.removeEventListener) {
		ReactNative.BackHandler.removeEventListener = function (type, handler) {
			const sub = backListeners.get(handler);
			if (sub && sub.remove) {
				sub.remove();
				backListeners.delete(handler);
			}
		};
	}
}

// Polyfill UIManager.dispatchViewManagerCommand to handle null reactTags safely
if (ReactNative.UIManager) {
	const origDispatch = ReactNative.UIManager.dispatchViewManagerCommand;
	if (origDispatch) {
		ReactNative.UIManager.dispatchViewManagerCommand = function (reactTag, commandID, commandArgs) {
			if (reactTag == null) {
				return;
			}
			try {
				return origDispatch.call(ReactNative.UIManager, reactTag, commandID, commandArgs);
			} catch (e) {
				// ignore invalid tag error
			}
		};
	}
}

// Polyfill Animated.View / View getNode() removed in modern React Native
if (ReactNative.Animated && ReactNative.Animated.View) {
	const origView = ReactNative.Animated.View;
	if (origView.prototype && !origView.prototype.getNode) {
		origView.prototype.getNode = function () {
			return this;
		};
	}
}

try {
	Object.defineProperty(ReactNative, 'ViewPropTypes', {
		configurable: true,
		enumerable: true,
		get() {
			return ViewPropTypes;
		}
	});
	Object.defineProperty(ReactNative, 'ColorPropType', {
		configurable: true,
		enumerable: true,
		get() {
			return ColorPropType;
		}
	});
	Object.defineProperty(ReactNative, 'EdgeInsetsPropType', {
		configurable: true,
		enumerable: true,
		get() {
			return EdgeInsetsPropType;
		}
	});
	Object.defineProperty(ReactNative, 'PointPropType', {
		configurable: true,
		enumerable: true,
		get() {
			return PointPropType;
		}
	});
	Object.defineProperty(ReactNative, 'TextPropTypes', {
		configurable: true,
		enumerable: true,
		get() {
			return TextPropTypes;
		}
	});
} catch (e) {
	ReactNative.ViewPropTypes = ViewPropTypes;
	ReactNative.ColorPropType = ColorPropType;
	ReactNative.EdgeInsetsPropType = EdgeInsetsPropType;
	ReactNative.PointPropType = PointPropType;
	ReactNative.TextPropTypes = TextPropTypes;
}
