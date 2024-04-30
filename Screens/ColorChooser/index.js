import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {TriangleColorPicker as ColorPicker, toHsv, fromHsv} from 'react-native-color-picker';

const ColorChooser = props => {
   const onColorChange = color => {
       console.log(color);
    props.onColorChangeHandler(fromHsv({...color}));
  };
   return (
    <View style={{flex: 1, height: 200}}>
      <View style={{flexDirection: 'row-reverse'}}>
        <Icon onPress={props.onClose} name={'close'} size={20} />
      </View>

      <ColorPicker
        // hideSliders
        color={toHsv(props.color)}
        style={{height:160,width:'100%'}}
        onColorChange={onColorChange}
        onColorSelected={color => props.onColorChangeHandler(color)}
      />
    </View>
  );
};

export default ColorChooser;
