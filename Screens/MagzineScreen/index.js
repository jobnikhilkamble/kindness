import {Card, CardItem} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import AppLayout from '../../components/AppLayout';
import Container from '../../components/Container';
import mag1 from '../../assets/images/mag1.png';
import u1 from '../../assets/images/u1.png';
import RoundButton from '../../components/RoundButton';
import InputField from '../../components/Input';
import {MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/EvilIcons';

const MagzineItem = () => (
  <Card style={styles.teamCard}>
    <Image
      source={mag1}
      style={{height: 200, width: '100%'}}
      resizeMode={'cover'}
    />
    <View
      style={{
        flexDirection: 'row-reverse',
        marginTop: 10,
        marginRight: 10,
      }}>
      <Text style={{marginRight: 10}}>September 15th 2020</Text>
    </View>
    <Container
      style={{
        marginTop: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
      }}>
      <Text style={styles.headerText}>
        5 REASONS YOU SHOULD BE SHARING ON SEEKINDNESS
      </Text>
      <Text>
        Sharing kindness stories just might be better for you than you thought!
        Here is our favourite reasons, they might surprise you …
      </Text>
    </Container>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <RoundButton
        customStyles={{width: 40, height: 40, marginTop: 10, marginLeft: 10}}>
        <Image source={u1} style={{width: 40, height: 40, borderRadius: 40}} />
      </RoundButton>
      <Text style={{marginLeft: 10, flex: 1}}>Leah Nusgart</Text>
      <Icon name={'retweet'} size={35} />
    </View>
  </Card>
);

const MagzineScreen = () => {
  return (
    <AppLayout>
      <View
        style={{
          backgroundColor: '#FFECD5',
          paddingVertical: 10,
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={styles.headerText}>SeeKindness Magazine</Text>
        <Text style={{fontSize: 16, textAlign: 'center'}}>
          Get inspired and informed about how kindness is changing the world
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#FCDFBC',
          paddingVertical: 10,
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={{fontSize: 8}}>
          Subscribe to our newsletter to get these inspiring articles right to
          your inbox!
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <RoundButton customStyles={{width: 120, height: 30}}>
            <Text>SUBSCRIBE</Text>
          </RoundButton>
        </View>
      </View>
      <Container>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 30,
            marginVertical: 10,
          }}>
          <InputField
            customStyles={{flex: 1, height: 40, fontSize: 14}}
            placeholder={'SEARCH...'}
          />

          <RoundButton
            customStyles={{
              marginLeft: 10,
              flex: 0.5,
              height: 30,
              backgroundColor: '#357B7F',
            }}>
            <Text style={{color: 'white'}}>SEARCH</Text>
          </RoundButton>
        </View>
        <View style={{marginTop: 10}}>
          <MagzineItem />
          <MagzineItem />
        </View>
      </Container>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
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
export default MagzineScreen;
