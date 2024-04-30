import {Card, CardItem} from 'native-base';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Avatar} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Container from '../../components/Container';
import AppLayout from '../../components/AppLayout';
import TabView from './TabView';
import {useSelector} from 'react-redux';

const ProfileScreen = React.memo(() => {
  const userDetails = useSelector(state => state.rawData.userDetails) || {};

  console.log(`use`);

  return (
    <AppLayout>
      <View style={styles.headerView}>
        <View style={{flexDirection: 'row-reverse'}}>
          <Icon name="setting" style={{color: 'white', margin: 15}} size={20} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.avatar}>
            <Icon name="user" size={30} style={{alignSelf: 'center'}} />
          </View>
        </View>
      </View>
      <Container>
        <Text style={{alignSelf: 'center', marginTop: 30, fontSize: 16}}>
          {userDetails.name}
        </Text>
        <Text style={{alignSelf: 'center', fontSize: 10}}>Vancouver, BC</Text>
        <View style={{marginTop: 20}}>
          <TabView />
        </View>
      </Container>
    </AppLayout>
  );
});

const styles = StyleSheet.create({
  selectedTab: {
    borderBottomWidth: 3,
  },
  tab: {
    borderBottomWidth: 1,
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
  },
  headerView: {
    backgroundColor: '#ED9678',
    height: 80,
    zIndex: 1,
  },
  avatar: {
    position: 'absolute',
    backgroundColor: '#D8D8D8',
    borderWidth: 1,
    borderColor: 'white',
    height: 80,
    width: 80,
    borderRadius: 50,
    zIndex: 15,
    justifyContent: 'center',
    marginTop: -20,
  },
});
export default ProfileScreen;
