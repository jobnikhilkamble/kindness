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
import CompleteDonation from './CompleteDoation';
import {DONATION_TYPES} from '../../constants';

const DonationScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [donationPrice, setDonationPrice] = useState(0);
  const [donationType, setDonationType] = useState(DONATION_TYPES.MONTHLY);
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const [step, setStep] = useState(0);
  const [isAnonymously, setIsAnonymously] = useState(true);
  const onSuccess = () => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  };
  if (step)
    return (
      <AppLayout>
        <View>
          <View style={{marginTop: 10}}>
            <PageHeader onBack={() => setStep(0)}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Complete Your Donation
              </Text>
            </PageHeader>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 14,
              }}>
              Proceed with your donation of ${donationPrice}
            </Text>
          </View>
          <CompleteDonation
            donationPrice={donationPrice}
            onBack={() => setStep(0)}
            onSucess={onSuccess}
          />
        </View>
      </AppLayout>
    );

  const InputHelper = ({helerText}) => (
    <View style={{...styles.row, marginTop: 10}}>
      <Image style={{width: 20, height: 20}} source={questionmark} />
      <Text style={{color: '#aaa', fontSize: 12}}>{helerText}</Text>
    </View>
  );

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
              Your Donations are an Act of Kindness
            </Text>
          </PageHeader>
        </View>
        <View style={styles.body}>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: '#ccc',
              paddingBottom: 20,
            }}>
            <Text style={{color: '#2F7A80', fontSize: 16, marginBottom: 10}}>
              Choose Donation
            </Text>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  onTouchEnd={() => setDonationType(DONATION_TYPES.MONTHLY)}
                  style={{flexDirection: 'row'}}>
                  <Radio
                    color={'black'}
                    selectedColor={'#357B7F'}
                    selected={donationType === DONATION_TYPES.MONTHLY}
                  />
                  <Text>Monthly Donation</Text>
                </View>
                <View
                  onTouchEnd={() => setDonationType(DONATION_TYPES.ONE_TIME)}
                  style={{flexDirection: 'row'}}>
                  <Radio
                    color={'black'}
                    selectedColor={'#357B7F'}
                    selected={donationType === DONATION_TYPES.ONE_TIME}
                  />
                  <Text>One Time Donation</Text>
                </View>
              </View>
              <View style={styles.paymentRow}>
                {[25, 50, 100].map((item, index) => {
                  return (
                    <Text
                      onPress={() => {
                        setDonationPrice(item);
                        setIsOtherAmount(false);
                      }}
                      style={{
                        ...styles.priceBox,
                        ...(donationPrice === item
                          ? styles.activePriceBox
                          : {}),
                      }}
                      key={index}>
                      ${item}
                    </Text>
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  paddingLeft: '10%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                  onTouchEnd={() => {
                    setIsOtherAmount(!isOtherAmount);
                    setDonationPrice(null);
                  }}>
                  <Radio
                    selected={isOtherAmount}
                    color={'black'}
                    selectedColor={'#357B7F'}
                  />
                  <Text style={{marginRight: 20}}>Other Amount</Text>
                </View>

                <InputField
                  customStyles={{height: 35, fontSize: 12}}
                  type="number"
                  placeholder="Other Amount"
                  value={isOtherAmount ? donationPrice : ''}
                  disabled={!isOtherAmount}
                  onChangeText={amount => {
                    if (!isNaN(amount)) {
                      setDonationPrice(amount);
                    }
                    if (amount?.length === 0) {
                      setDonationPrice(null);
                    }
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#2F7A80',
                fontSize: 16,
                marginBottom: 5,
                marginTop: 20,
              }}>
              Choose Donation
            </Text>
            <Text>
              We would like to post a Thank You Pin on the map to thank you for
              your gratitude. No private or monetary information will be shared.{' '}
            </Text>
            <View style={{marginTop: 20, marginBottom: 20}}>
              <Text style={styles.inputLabel}>Name *</Text>
              <InputField
                onChangeText={name => setFirstName(name)}
                value={firstName}
                customStyles={styles.input}
              />
              <InputHelper helerText="Please indicate who we will dedicate our Thank You Pin to" />
              <Text style={styles.inputLabel}>Location</Text>
              <InputField
                onChangeText={value => setLocation(value)}
                value={location}
                customStyles={styles.input}
              />
              <InputHelper helerText="This is where we will drop the pin to represent where the donations from" />
              <Text style={styles.inputLabel}>Message</Text>
              <TextAreaField
                onChangeText={emailText => setEmail(emailText)}
                value={email}
              />
              <InputHelper helerText="Add a message we will include with the Thank You Pin" />
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onTouchEnd={() => {
                  setIsAnonymously(!isAnonymously);
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 18, flex: 1}}>
                  Post Anonymously
                </Text>
                <Switch size="lg" value={isAnonymously} />
              </View>
              <RoundButton
                onPress={() => setStep(1)}
                customStyles={styles.signUpButton}
                disabled={!donationPrice || !firstName}>
                <Text>Next</Text>
              </RoundButton>
            </View>
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
  input: {
    height: 32,
    fontSize: 12,
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
  row: {
    flexDirection: 'row',
  },
  paymentRow: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  priceBox: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 20,
    borderWidth: 0.3,
  },
  activePriceBox: {
    backgroundColor: '#FFC6B2',
  },
});

export default DonationScreen;
