import React from 'react';
import {StyleSheet} from 'react-native';
import {Textarea} from 'native-base';

const TextAreaField = props => {
  const {placeholder, customStyles = {}, id = '', values = {}, onChange} = props;
  return (
    <Textarea
      style={{...styles.textArea, ...customStyles}}
      rowSpan={5}
      placeholder={placeholder}
      value={values[id] || ''}
      onChangeText={(e) => onChange(e)}
    />
  );
};

export const styles = StyleSheet.create({
  textArea: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 5,
    flex: 1,
    borderWidth: 0.3,
  },
});

export default TextAreaField;
