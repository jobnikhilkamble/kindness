import React from 'react';
import {View, Text} from 'react-native';
import AppLayout from '../../components/AppLayout';
import Container from '../../components/Container';
import {BoldText, PrimaryText} from '../../components/Texts';

const PurchaseDetailsScreen = () => {
  return (
    <AppLayout>
      <Container>
        <Text style={{fontWeight: '600', fontSize: 32}}>
          Thank you for your purchase!
        </Text>
        <View style={{marginTop: 20}}>
          <BoldText style>Your Unique URL Code</BoldText>
          <Text>
            Share this URL code to get your Thank You Card signed. A copy pf
            this has also been sent to the senders email. When your card signing
            is closed, we will send an email to the sender and prompt them to
            forward the completed card to the recipient. You can also edit,
            close or send the card from the tab in your profile.
          </Text>
          <View style={{  marginTop: 30,flexDirection:'row',borderWidth:1,padding:6,borderColor:'#cccccc'}}>
            <PrimaryText>
              https://www.seekindness.org/KindnessCard/CustomURL
            </PrimaryText>
          </View>
          <View style={{marginTop: 20}}>
          <BoldText >Purchase Details</BoldText>
    <Text>
    A receipt has been sent to the senders email and can also be found under the in your profile.  
    </Text>
          </View>
        </View>
      </Container>
    </AppLayout>
  );
};

export default PurchaseDetailsScreen;
