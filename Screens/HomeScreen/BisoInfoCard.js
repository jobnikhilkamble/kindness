import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import RoundButton from '../../components/RoundButton';
import {SCREEN_WIDTH} from '../../constants';

const BisoInfoCard = ({selectedBisso, onSign = () => {}}) => {
  let leftValue = new Animated.Value(-110);
  useEffect(() => {
    Animated.timing(leftValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, []);
  return (
    <View>
      <Animated.View
        style={[
          {
            transform: [{translateX: leftValue}],
          },
        ]}>
        <View
          style={{
            backgroundColor: 'white',
            width: SCREEN_WIDTH - 20,
            padding: 20,
            elevation: 6,
            zIndex: 111,
            marginLeft: 10,
            marginTop: 6,
          }}>
          <View
            style={{
              borderWidth: 0.8,
              padding: 10,
              borderColor: 'gray',
              height: 'auto',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, flex: 1}}>
                {selectedBisso?.metaData?.main_header}
              </Text>
              <RoundButton
                onPress={() => {
                  onSign(selectedBisso);
                }}
                customStyles={{borderWidth: 1, width: 120, height: 30}}>
                <Text>SIGN</Text>
              </RoundButton>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{flex: 1, fontSize: 10}}>
                Signing closes on November 10th
              </Text>
              <Text style={{fontSize: 10}}>10 / 100 Signatures</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, flex: 1}}>Article1234</Text>
            <Text style={{fontSize: 12}}>Richmond BC</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default BisoInfoCard;
