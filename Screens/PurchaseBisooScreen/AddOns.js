import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, Picker} from 'react-native';
import {Radio} from 'native-base';
import {SelectedCardDetails} from './DatesInfo';
import {addUpdatePostMetaAction} from '../../hooks/useCreatePost';

const AddOns = ({useCreatePostProps}) => {
  const {state: values, dispatch} = useCreatePostProps;

  console.log(useCreatePostProps);
  const postMeta = values.postMeta;
  const updateMetaData = metaObject =>
    addUpdatePostMetaAction(dispatch, metaObject);

  const [selectedValue, setSelectedValue] = useState();

  const setSignature = data => {
    setSelectedValue(data);
    updateMetaData({signature_price: data});
  };

  return (
    <View style={{height: 'auto'}}>
      <SelectedCardDetails cardMeta={postMeta} />
      <View style={{marginTop: 10}}>
        <Text style={{color: '#2F7A80', fontSize: 20}}>5 Signatures</Text>
        <Text style={{marginTop: 10}}>
          Your basic BisOO can be signed by up to 5 people, select from the
          options below to allow more signatures that are represented by pins on
          the map!{' '}
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 12, marginRight: 10}}>
            Allow more signatures on your BisOO
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            padding: 3,
            borderColor: 'black',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 20, width: '50%', backgroundColor: '#ffffff'}}
            onValueChange={(itemValue, itemIndex) => setSignature(itemValue)}>
            <Picker.Item label="6-24     $4.99" value=" $4.99" />
            <Picker.Item label="24-52     $5.99" value="$5.99" />
          </Picker>
        </View>
      </View>

      <View style={{marginTop: 10}}>
        <Text style={{color: '#2F7A80', fontSize: 20}}>6 Custom URL</Text>
        <Text style={{marginTop: 10}}>
          A URL is an internet address, the link you will send to people to sign
          your BisOO as well as the link we will share with your recipient.
        </Text>
      </View>
      <View style={{width: '45%', marginRight: '10%'}}>
        <View
          onTouchStart={() => updateMetaData({custom_url_price: '$0'})}
          style={{flexDirection: 'row'}}>
          <Radio
            color={'black'}
            selectedColor={'#357B7F'}
            selected={postMeta.custom_url_price === '$0'}
          />
          <Text>Default</Text>
        </View>
      </View>
      <View style={{width: '45%'}}>
        <View
          onTouchStart={() => updateMetaData({custom_url_price: '$5'})}
          style={{flexDirection: 'row'}}>
          <Radio
            color={'black'}
            selectedColor={'#357B7F'}
            selected={postMeta.custom_url_price === '$5'}
          />
          <Text>Custom</Text>
        </View>
      </View>

      <View style={{marginTop: 10}}>
        <Text style={{color: '#2F7A80', fontSize: 20}}>7 Live Time</Text>
        <Text style={{marginTop: 10}}>
          Once your BisOO is live, you will have one month to collect signatures
          and view it on our site. Add on more Live Time to extend the time you
          hace to collect signatures and see your BisOO! You can edit this at
          any time from your profile and once cards expire they will remain in
          your archive.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {[
          {sublabel: '$0', value: 1, label: '1 Month'},
          {sublabel: '$30.00', value: 3, label: '3 Months'},
          {sublabel: '$50.00', value: 6, label: '6 Months'},
          {sublabel: '$80.00', value: 12, label: '1 Year'},
        ].map(({sublabel, label, value}) => {
          return (
            <View
              key={value}
              onTouchStart={() =>
                updateMetaData({
                  card_live_time: label,
                  live_time_price: sublabel,
                })
              }
              style={{flexDirection: 'row', width: '50%'}}>
              <Radio
                color={'black'}
                selectedColor={'#357B7F'}
                selected={postMeta.card_live_time === label}
              />
              <Text>{label} </Text>
              <Text>{sublabel === '$0' ? 'included' : sublabel}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AddOns;
