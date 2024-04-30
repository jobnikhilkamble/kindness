import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppLayout from '../../components/AppLayout';
import PageHeader from '../../components/PageHeader';
import {useNavigation} from '@react-navigation/native';
import RoundButton from '../../components/RoundButton';
import InputField from '../../components/Input';
import {Radio, Switch, Textarea} from 'native-base';
import questionmark from '../../assets/images/que.png';
import TextAreaField from '../../components/RoundButton/TextAreaField';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StripPanel} from '../StripProvider';

const CompleteDonation = ({donationPrice, onSucess}) => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCoutry] = useState('');

  const [emailError, setEmailError] = useState();

  return (
      <View>
        
        <View style={styles.body}>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: '#ccc',
              paddingBottom: 20,
            }}>
            <Text style={{color: '#2F7A80', fontSize: 16, marginBottom: 10}}>
              Billing Details
            </Text>
            <View style={styles.row}>
              <InputFieldWithLabel
                onChangeText={setFirstName}
                label="First Name"
              />
              <InputFieldWithLabel
                onChangeText={setLastName}
                label="Last Name"
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Address</Text>
              <InputField
                onChangeText={setAddress}
                customStyles={styles.input}
              />
            </View>
            <View style={styles.row}>
              <InputFieldWithLabel onChangeText={setCity} label="City" />
              <InputFieldWithLabel
                onChangeText={setZipCode}
                label="Zip/Postal Code"
              />
            </View>
            <View style={styles.row}>
              <InputFieldWithLabel
                onChangeText={setState}
                label="Province/State"
              />
              <InputFieldWithLabel onChangeText={setCoutry} label="Country" />
            </View>

            <Text
              style={{
                color: '#2F7A80',
                fontSize: 16,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Payment
            </Text>
            <SafeAreaView>
              <StripPanel
                amount={donationPrice}
                onSucess={onSucess}
                billingDetails={{
                  firstName,
                  lastName,
                  city,
                  zipCode,
                  country,
                  state,
                  address,
                }}
              />
            </SafeAreaView>
          </View>
        </View>
      </View>
  );
};

const InputFieldWithLabel = ({label, ...props}) => {
  return (
    <View style={{width: '50%'}}>
      <Text style={styles.inputLabel}>{label}</Text>
      <InputField {...props} customStyles={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    width: '40%',
    marginTop: 10,
  },
  body: {
    padding: 10,
  },
  input: {
    height: 40,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default CompleteDonation;
