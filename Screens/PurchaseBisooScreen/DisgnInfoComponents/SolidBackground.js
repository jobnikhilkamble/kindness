import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text} from 'react-native';
import InputField from '../../../components/Input';
import ColorChooser from '../../ColorChooser';
import {addUpdatePostMetaAction} from './../../../hooks/useCreatePost';
import {BisooTextDetails, SolidBgColor} from '../DesignInfo';

const SolidBackground = ({useCreatePostProps}) => {
  const {state, dispatch} = useCreatePostProps;
  const updateMeta = payload => addUpdatePostMetaAction(dispatch, payload);
  const [showColor, setShowColor] = useState('');
  const values = state.postMeta;

  const onColorChange = color => {
    if (showColor === 'back') {
      updateMeta({card_colour: color});
    }
    if (showColor === 'font') {
      updateMeta({font_colour: color});
    }
  };
  return (
    <View>
      <SolidBgColor {...values} />
      <BisooTextDetails useCreatePostProps={useCreatePostProps} />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={{fontWeight: 'bold', flex: 0.5}}>Font Colour</Text>
        <Text style={{fontWeight: 'bold'}}>Card Colour</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            marginRight: 10,
            alignItems: 'center',
          }}>
          <Text style={{marginRight: 5}}>#</Text>
          <InputField
            value={values.font_colour}
            customStyles={{height: 40, fontSize: 18}}
          />
          <View
            onTouchEnd={() => {
              setShowColor('font');
            }}
            style={{
              backgroundColor: values.font_colour || 'black',
              height: 20,
              width: 20,
              borderRadius: 5,
            }}></View>
        </View>
        <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: 5}}>#</Text>
          <InputField
            value={values.card_colour}
            customStyles={{height: 40, fontSize: 18}}
          />
          <View
            onTouchEnd={() => {
              setShowColor('back');
            }}
            style={{
              backgroundColor: values.card_colour || 'black',
              height: 20,
              width: 20,
              borderRadius: 5,
            }}></View>
        </View>
      </View>
      <View style={{height: !!showColor ? 200 : 0}}></View>

      {!!showColor && (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'white',
              zIndex: 111,
            }}>
            <ColorChooser
              onClose={() => setShowColor('')}
              onColorChangeHandler={onColorChange}
              color={
                showColor === 'back'
                  ? values.card_colour
                  : showColor === 'font'
                  ? values.font_colour
                  : 'green'
              }
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SolidBackground;
