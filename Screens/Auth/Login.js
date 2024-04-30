import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppLayout from '../../components/AppLayout';
import PageHeader from '../../components/PageHeader';
import {useNavigation} from '@react-navigation/native';
import RoundButton from '../../components/RoundButton';
import InputField from '../../components/Input';
import {doPost} from '../../services/request';
import {updateRawData,loginUser} from '../../Reducers/actions';
import { showToaster } from './../../utils/index';

export const Login = props => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const data = await doPost('login', {
        username,
        password,
      });

      if (data.token) {
        updateRawData({authUser: data.token, userDetails: data.userDetails});
       console.log({tkennn:data.token})
        loginUser(data.token)
        navigation.navigate(props.route.name || 'Home');
        return;
      }
    } catch (error) {
      showToaster('Please check username and password.', {
        type: 'danger',
        duration: 3000,
      });
    }

    //Alert
  };

  return (
    <AppLayout>
      <View>
        <View style={{marginTop: 10}}>
          <PageHeader onBack={() => navigation.navigate('Home')}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Login
            </Text>
          </PageHeader>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.inputLabel}>Username</Text>
            <InputField
              onChangeText={name => setUsername(name)}
              value={username}
            />
            <Text style={styles.inputLabel}>Password</Text>
            <InputField
              type="password"
              onChangeText={value => setPassword(value)}
              value={password}
            />
          </View>
          <RoundButton
            onPress={login}
            customStyles={styles.signUpButton}
            disabled={!username || !password}>
            <Text>Login</Text>
          </RoundButton>
          <View
            style={{justifyContent: 'center', fontWeight: 'bold', padding: 10}}
            onTouchStart={() => navigation.navigate('SignScreen')}>
            <Text>Are you a new user?</Text>
          </View>
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  signUpButton: {
    width: '100%',
    marginTop: 10,
  },
});

export default Login;
