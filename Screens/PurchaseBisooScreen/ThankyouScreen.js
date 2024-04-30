import React, {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/AntDesign';
import InputField from '../../components/Input';

import {View, Text, StyleSheet, Share, Button} from 'react-native';
import {updateRawData} from '../../Reducers/actions';
import {addUpdatePostAttributeAction} from './../../hooks/useCreatePost';
import {doGet} from '../../services/request';

const ThankyouScreen = ({useCreatePostProps, post}) => {
  const {state, dispatch} = useCreatePostProps;
  const [editUrl, setEditUrl] = useState(false);
  const [url, setUrl] = useState(post.uuid);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View>
        <Text style={{}}>Thank you for your purchase!</Text>
        <Text style={{fontWeight: 'bold', fontSize: 13, marginTop: 5}}>
          Your Unique URL Code
        </Text>
        <Text style={{color: 'black', opacity: 0.5, marginTop: 5}}>
          Share this URL code to get your Thank You Card signed. A copy pf this
          has also been sent to the senders email. When your card signing is
          closed, we will send an email to the sender and prompt them to forward
          the completed card to the recipient. You can also edit, close or send
          the card from the tab in your profile.
        </Text>
        <View>
          {isEditUrl ? (
            <Text>Edit Url</Text>
          ) : (
            <View>
              <InputField value={url} onChangeText={setUrl} />
            </View>
          )}
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
          Purchase Details
        </Text>
        <Text style={{color: 'black', opacity: 0.5, marginTop: 5}}>
          A receipt has been sent to the senders email and can also be found
          under the tab in your profile.
        </Text>
        <View>
          {[
            {label: '', value: ''},
            {label: '', value: ''},
            {label: '', value: ''},
            {label: '', value: ''},
            {label: '', value: ''},
            {label: '', value: ''},
          ].map(ins => {
            return (
              <View key={ins.label}>
                <Text>{ins.label}</Text>
                <Text>{ins.value}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <View>
            <Text>Time to get your card signed!</Text>
            <Button>Share</Button>
          </View>
          <Text>
            Share this URL with your whoever you would like to sign the card
          </Text>
          <Text>{url}</Text>
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
export default ThankyouScreen;
