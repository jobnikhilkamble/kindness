import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import InputField from '../../components/Input';

import {View, Text, StyleSheet} from 'react-native';
import {updateRawData} from '../../Reducers/actions';
import { addUpdatePostAttributeAction } from './../../hooks/useCreatePost';
import { doGet } from '../../services/request';

const InfoForm = ({useCreatePostProps, infoProps}) => {
  const {state, dispatch} = useCreatePostProps;
  const {
    senderName,
    setSenderName,
    senderMail,
    setSenderMail,
    rname,
    setRname,
    rmail,
    setRmail,
    addSender,
    addRei,
    senderInfo,
    receiverInfo,
  } = infoProps;

  const initiateBisoo = async () => {
    const data = await doGet('initiateBisoo');
    console.log(data, data);
    addUpdatePostAttributeAction(dispatch, {id: data.id})
  };

  useEffect(() => {
    updateRawData({disableNext: false});
    // initiateBisoo()
  }, []);
  return (
    <>
      <View>
        <Text style={{color: '#2F7A80'}}>1 To/From</Text>
        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 5}}>
          Senders Info
        </Text>
        <Text style={{color: 'black', opacity: 0.5, marginTop: 5}}>
          This is who the card will appear to be from when it is sent to the
          recipient
        </Text>
        {senderInfo.map(({name, mail}) => {
          return (
            <View key={name} style={{marginTop: 10}}>
              <InputField
                customStyles={{height: 40, fontSize: 16}}
                value={name}
                disabled
              />
              <InputField
                customStyles={{height: 40, fontSize: 16, marginTop: 5}}
                value={mail}
                disabled
              />
            </View>
          );
        })}
        <View style={{marginTop: 10}}>
          <InputField
            customStyles={{height: 40, fontSize: 16}}
            placeholder={'Name'}
            value={senderName}
            onChangeText={value => setSenderName(value)}
          />
          <InputField
            customStyles={{height: 40, fontSize: 16, marginTop: 5}}
            placeholder={'Email'}
            value={senderMail}
            onChangeText={value => setSenderMail(value)}
          />
          <View style={styles.circle} onTouchStart={addSender}>
            <Icon name="plus" size={15} color={'black'} />
          </View>
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 13,
            marginTop: 5,
          }}>
          Recipients Info
        </Text>
        <Text style={{color: 'black', opacity: 0.5, marginTop: 5}}>
          This is who the card will appear to be from when it is sent to the
          recipient
        </Text>
        {receiverInfo.map(({name, mail}) => {
          return (
            <View style={{marginTop: 10}}>
              <InputField
                customStyles={{height: 40, fontSize: 16}}
                value={name}
                disabled
              />
              <InputField
                customStyles={{height: 40, fontSize: 16, marginTop: 5}}
                value={mail}
                disabled
              />
            </View>
          );
        })}
        <View style={{marginTop: 10}}>
          <InputField
            customStyles={{height: 40, fontSize: 16}}
            placeholder={'Name'}
            value={rname}
            onChangeText={value => setRname(value)}
          />
          <InputField
            customStyles={{height: 40, fontSize: 16, marginTop: 5}}
            placeholder={'Email'}
            value={rmail}
            onChangeText={value => setRmail(value)}
          />
          <View style={styles.circle} onTouchStart={addRei}>
            <Icon name="plus" size={15} color={'black'} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 2,
    width: 22,
    marginTop: 2,
  },
});
export default InfoForm;
