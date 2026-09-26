import React from 'react';
import r from 'rnss';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextPropTypes } from 'deprecated-react-native-prop-types';

export default function PickerAndroid(props) {
	const textColor = r.vars().textColor || '#000000';
	const cardColor = r.vars().cardColor || '#ffffff';

	const options = props.options.map(({ value, text }) => (
		<Picker.Item
			key={value}
			value={value}
			label={text}
			color={textColor}
			style={{ backgroundColor: cardColor, color: textColor }}
		/>
	));

	return (
		<View style={[containerStyle, props.containerStyle]}>
			<Picker
				selectedValue={props.value}
				onValueChange={props.onChange}
				enabled={!props.disabled}
				mode={props.mode}
				prompt={props.prompt}
				itemStyle={props.itemStyle}
				style={[{ color: textColor, backgroundColor: cardColor }, props.style]}
				dropdownIconColor={textColor}
			>
				{options}
			</Picker>
		</View>
	);
}
PickerAndroid.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired
		})
	).isRequired,
	disabled: PropTypes.bool,
	mode: PropTypes.string,
	prompt: PropTypes.string,
	style: TextPropTypes ? TextPropTypes.style : PropTypes.any,
	itemStyle: TextPropTypes ? TextPropTypes.style : PropTypes.any,
	containerStyle: TextPropTypes ? TextPropTypes.style : PropTypes.any
};

const containerStyle = r`br 4; bw 1; p 0; m 0`;
