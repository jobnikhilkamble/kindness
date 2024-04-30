import React, {useEffect, useState} from 'react';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {doPost} from '../../services/request';
import RoundButton from './../../components/RoundButton/index';
import {useNavigation} from '@react-navigation/core';
import {STRIPE_KEY} from '../../constants';
import {showToaster} from '../../utils';

export const PaymentScreen = ({
  billingDetails = {},
  amount,
  onSucess = () => {},
}) => {
  const navigation = useNavigation();
  const {confirmPayment} = useStripe();
  const [clientSecrete, setClientSecrete] = useState();
  const [buttonDisable, setButtonDisable] = useState();

  useEffect(() => {
    setButtonDisable(true);
    doPost('create-payment-intent', {amount: amount || 100 * 100}).then(res => {
      const secrete = res.clientSecret;
      console.log(secrete);
      setButtonDisable(false);
      setClientSecrete(secrete);
    });
  }, []);

  const handlePayment = async () => {
    console.log('here I am');
    setButtonDisable(true);
    const {error} = await confirmPayment(clientSecrete, {
      type: 'Card',
      billingDetails,
    });

    setButtonDisable(false);
    if (error) {
      showToaster(error.message, {type: 'danger', duration: 3000});
      return;
    }

    onSucess();
    showToaster('Payment Successful!', {type: 'success', duration: 1000});
  };

  return (
    <View style={{width: '100%'}}>
      <Text style={{fontWeight: 'bold'}}>Card Number</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          borderWidth: 0.3,
          backgroundColor: '#cccccc',
          borderColor: '#000000',
          textColor: '#000000',
          cursorColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 40,
          marginVertical: 10,
          flexDirection: 'column',
          borderWidth: 1,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <View style={styles.row}>
        <RoundButton
          onPress={() => navigation.navigate('Home')}
          customStyles={{width: 100}}>
          <Text>CANCEl</Text>
        </RoundButton>
        <RoundButton
          disabled={buttonDisable}
          text={onSucess ? 'Pay Now' : 'DONATE'}
          onPress={() => handlePayment()}
          customStyles={{width: 100}}
        />
      </View>
    </View>
  );
};

export const StripPanel = props => {
  return (
    <StripeProvider
      publishableKey={STRIPE_KEY}
      merchantIdentifier="merchant.identifier">
      <SafeAreaView>
        <PaymentScreen {...props} />
      </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    elevation: 10
  },
});
