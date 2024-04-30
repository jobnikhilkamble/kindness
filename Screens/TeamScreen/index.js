import {Card, CardItem} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppLayout from '../../components/AppLayout';
import Container from '../../components/Container';
import sp1 from '../../assets/images/sp1.png';
import sp2 from '../../assets/images/sp2.png';

const TeamScreen = () => {
  return (
    <AppLayout>
      <Container>
        <Text style={styles.headerText}>Meet the Team </Text>
        <View style={styles.cardRow}>
          <Card style={styles.teamCard}>
            <Text>Name</Text>
          </Card>
          <Card style={styles.teamCard}>
            <Text>Name</Text>
          </Card>
        </View>

        <View style={styles.cardRow}>
          <Card style={styles.teamCard}>
            <Text>Name</Text>
          </Card>
          <Card style={styles.teamCard}>
            <Text>Name</Text>
          </Card>
        </View>

        <View style={styles.cardRow}>
          <Card style={styles.teamCard}>
            <Text>Name</Text>
          </Card>
          <Card style={styles.teamCard}>
            <Text>Name</Text>
          </Card>
        </View>

        <Text style={{...styles.headerText, fontSize: 25}}>
          Thank you to our Sponsors
        </Text>
        <Text>
          You'll never see advertising on See Kindness. The site and app (coming
          soon!) would not be possible without our amazing sponsors and their
          generous kindness! Show your love by supporting them.
        </Text>

        <View style={styles.cardRow}>
          <Card style={{flex: 1, height: 150, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                source={sp1}
                resizeMode="center"
                style={{width: 100, height: 100}}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: '#337A7F'}}>www.sponsorswebsite.ca</Text>
            </View>
          </Card>
          <Card style={{flex: 1, height: 150, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                source={sp2}
                resizeMode="center"
                style={{width: 100, height: 100}}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: '#337A7F'}}>www.sponsorswebsite.ca</Text>
            </View>
          </Card>
        </View>
      </Container>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
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
    flex: 1,
    marginRight: 10,
    height: 150,
    padding: 10,
    backgroundColor: '#b8b8b8',
    elevation: 1,
    borderWidth: 0,
  },
});
export default TeamScreen;
