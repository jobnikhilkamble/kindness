import {useNavigation} from '@react-navigation/core';
import {Button} from 'native-base';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppLayout from '../../components/AppLayout';
import Container from '../../components/Container';
import InputField from '../../components/Input';
import RoundButton from '../../components/RoundButton';
import {uploadImage} from '../../services/request';
import CompleteDonation from '../Donation/CompleteDoation';
import {StripPanel} from '../StripProvider';

const CheckoutScreen = props => {
  const navigation = useNavigation();
  const {onPayment, amount, selectedImage} = props;

  const onPaymentHandler =async () => {
    onPayment();
  };

  return (
    <AppLayout>
      <Container>
        <Text style={{fontWeight: '600', fontSize: 32}}>
          Purchase Kindness Card
        </Text>
        <Text style={{fontWeight: '600', fontSize: 20}}>
          Purchase Total: {amount}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{color: '#2F7A80', fontSize: 30}}>Billing</Text>
        </View>

        <CompleteDonation amount={amount} onSucess={onPaymentHandler} />
      </Container>
    </AppLayout>
  );
};

export default CheckoutScreen;
