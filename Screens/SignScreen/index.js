import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppLayout from '../../components/AppLayout';
import PageHeader from '../../components/PageHeader';
import {useNavigation} from '@react-navigation/native';
import RoundButton from '../../components/RoundButton';
import InputField from '../../components/Input';
import {doPost} from '../../services/request';
import {updateRawData} from '../../Reducers/actions';
import {isValidEmail, showToaster} from './../../utils/index';

const SignScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const login = async () => {
    try {
      if (!username) {
        showToaster('Please enter username.', {
          type: 'danger',
          duration: 1000,
        });
        return;
      }
      if (!password) {
        showToaster('Please enter password.', {
          type: 'danger',
          duration: 1000,
        });
        return;
      }
      if (!email) {
        showToaster('Please enter email.', {
          type: 'danger',
          duration: 1000,
        });

        return;
      }
      if (!name) {
        showToaster('Please enter name.', {
          type: 'danger',
          duration: 1000,
        });

        return;
      }

      if (!isValidEmail(email)) {
        showToaster('Please enter valid email.', {
          type: 'danger',
          duration: 1000,
        });

        return;
      }

      const data = await doPost('register', {
        username,
        password,
        email,
        name,
      });
      showToaster('Account Create Succesfully.', {
        type: 'success',
        duration: 3000,
      });

      navigation.navigate('Login');
    } catch (error) {
      showToaster('Username or email already exists.', {
        type: 'danger',
        duration: 3000,
      });
    }
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
            <Text style={styles.inputLabel}>Name</Text>
            <InputField onChangeText={name => setName(name)} value={name} />
            <Text style={styles.inputLabel}>Email</Text>
            <InputField onChangeText={name => setEmail(name)} value={email} />
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
            disabled={!username || !password || !email || !name}>
            <Text>Sign In</Text>
          </RoundButton>
          <View
            style={{justifyContent: 'center', fontWeight: 'bold', padding: 10}}
            onTouchStart={() => navigation.navigate('Login')}>
            <Text>Already an account?</Text>
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

export default SignScreen;
