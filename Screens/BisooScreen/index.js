import React from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AppLayout from '../../components/AppLayout';
import BissoM from '../../assets/images/bissom.png';
import RoundButton from '../../components/RoundButton';
import {useNavigation} from '@react-navigation/core';

const BisooScreen = () => {
  const navigation = useNavigation();
  const onPurchaseHandler = () => {
    navigation.navigate('PurchaseBisooScreen');
  };
  return (
    <AppLayout>
      <View
        style={{
          backgroundColor: '#FFECD5',
          paddingVertical: 10,

          padding: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{...styles.headerText, fontSize: 16}}>
            PURCHASE KINDNESS CARD
          </Text>
          <Text style={styles.headerText}>Kindness Cards</Text>
          <Text style={{fontSize: 16}}>
            Show your gratitude by purchasing a Thank You Card for someone who’s
            been kind. Whether it’s your neighbour, little league coach or the
            healthcare workers in your city, you can show someone you appreciate
            their acts of kindness by sending them a personal map filled with
            messages of appreciation.
          </Text>
        </View>
        <Text style={{marginTop: 10}}>How It Works </Text>
        <Text style={styles.item}>
          1. Decide who you would like to send a Thank You Card to and design
          your custom card.
        </Text>
        <Text style={styles.item}>
          2. Select the level of card you want to purchase depending on how many
          signatures you would like.
        </Text>
        <Text style={styles.item}>
          3. Decide whether the cut off for signing the card is on a certain
          date or after a set amount of signatures.
        </Text>
        <Text style={styles.item}>
          4. Choose your privacy settings that determine who can view and sign
          the card.
        </Text>
        <Text style={styles.item}>
          5. Upon purchasing your card, you will recieve a uniqe URL to share
          with whoever you would like to sign the card.
        </Text>

        <Text style={styles.item}>
          6. Those who choose to sign the card will be able to write a message
          and attatch it to a pin on the map documenting where they’re sharing
          their gratitude from.
        </Text>
        <Text style={styles.item}>
          7. When the signing is compete, the recipient will recieve an email
          and link to their Thank You Card.
        </Text>
        <View style={{marginTop: 10}}>
          <View style={{height: 400}}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 18.5204,
                longitude: 73.8567,
                latitudeDelta: 22.5726,
                longitudeDelta: 88.3639,
              }}>
              <Marker
                coordinate={{latitude: 18.5204, longitude: 73.8567}}
                icon={BissoM}
              />

              <Marker
                coordinate={{latitude: 22.5726, longitude: 88.3639}}
                icon={BissoM}
              />
            </MapView>
          </View>
          {/* <View style={styles.card}></View> */}
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <RoundButton
            onPress={onPurchaseHandler}
            customStyles={{flex: 1, height: 30}}>
            <Text>PURCHASE NOW</Text>
          </RoundButton>
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: '#ffcc4c',
  },
  map: {...StyleSheet.absoluteFillObject},
  item: {marginTop: 10},
  headerText: {
    fontSize: 24,
    color: 'black',
  },
  missionText: {
    fontSize: 16,
    marginTop: 40,
  },
  cardRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  teamCard: {
    paddingBottom: 10,
  },
});
export default BisooScreen;
