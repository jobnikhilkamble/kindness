import React from 'react';
import {Button} from 'native-base';
import {Text, StyleSheet} from 'react-native';

const RoundButton = props => {
  const {
    onPress = () => {},
    disabled = false,
    text,
    customStyles = {},
    textStyles = {},
  } = props;
  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.postButton,
        customStyles,
        disabled?styles.disabled:{}
      ]}>
      {text && <Text style={{...textStyles}}>{text}</Text>}
      {props.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: 'gray',
  },
  postButton: {
    // flex: 0.3,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});

export default RoundButton;
