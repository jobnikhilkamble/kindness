import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {View, Text, Image, ImageBackground} from 'react-native';
import InputField from '../../../components/Input';
import ColorChooser from '../../ColorChooser';
import RoundButton from '../../../components/RoundButton';
import DesignImage from '../../../assets/images/design.png';
import {BGImageAndOverlayImg, BisooTextDetails} from '../DesignInfo';
import { addUpdatePostMetaAction } from '../../../hooks/useCreatePost';

const BackgroundAndImage = ({uploadImageForBisoo, useCreatePostProps}) => {
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
      <BGImageAndOverlayImg {...values} />
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
      <Text style={{marginTop: 10, fontWeight: 'bold'}}>Add Image</Text>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <RoundButton
          onPress={() =>
            launchImageLibrary({mediaType: 'photo'}, value => {
              console.log(value);
              const image = value?.assets;
              if (image) uploadImageForBisoo(value?.assets[0]);
            })
          }
          customStyles={{width: 200, height: 30}}>
          <Text>Upload Image</Text>
        </RoundButton>
      </View>
      {!!values?._wp_attached_file && (
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name={'close'}
            size={16}
            onPress={() => updateMeta({_wp_attached_file: ''})}
            style={{marginRight: 10}}
          />
          {<Text>{values._wp_attached_file}</Text>}
        </View>
      )}
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <RoundButton
          onPress={() =>
            launchImageLibrary({mediaType: 'photo'}, value => {
              console.log(value);
              const image = value?.assets;
              if (image) uploadImageForBisoo(value?.assets[0]);
            })
          }
          customStyles={{width: 200, height: 30}}>
          <Text>Upload Background Image</Text>
        </RoundButton>
      </View>
      {!!values?._wp_attached_file && (
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon
            name={'close'}
            size={16}
            onPress={() => updateMeta({_wp_attached_file: ''})}
            style={{marginRight: 10}}
          />
          {<Text>{values._wp_attached_file}</Text>}
        </View>
      )}
    </View>
  );
};

export default BackgroundAndImage;
