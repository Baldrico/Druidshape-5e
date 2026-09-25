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
	ReactNative.Linking.removeEventListener = function (type, handler) {
		// Handled via subscription.remove() in modern RN
	};
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
