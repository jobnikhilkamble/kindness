import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppLayout from '../../components/AppLayout';
import PageHeader from '../../components/PageHeader';
import {useNavigation} from '@react-navigation/native';
import RoundButton from '../../components/RoundButton';
import InputField from '../../components/Input';

const SubscribeScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [emailError, setEmailError] = useState()


  return (
    <AppLayout>
      <View>
      <View style={{marginTop:10}}>
          <PageHeader showClose={false} onBack={() => navigation.navigate('Home')}>
              <Text style={{ flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Share your act of kindness</Text>
          </PageHeader>
      </View>
      <View style={styles.body}>
        <Text style={styles.inputLabel}>First Name</Text>
        <InputField onChange={e => setFirstName(e.target.value)} value={firstName} customStyles={styles.input}/>
        <Text style={styles.inputLabel}>Last Name</Text>
        <InputField onChange={e => setLastName(e.target.value)} value={lastName} customStyles={styles.input}/>
        <Text style={styles.inputLabel}>Email</Text>
        <InputField onChange={e => setEmail(e.target.value)} value={email} customStyles={styles.input}/>
        <RoundButton onPress={() => navigation.navigate('Home')} customStyles={styles.signUpButton}>
          <Text>SIGN UP</Text>
        </RoundButton>
      </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5

  },
  signUpButton: {
    width: '100%',
    marginTop: 10

  }
});

export default SubscribeScreen;
