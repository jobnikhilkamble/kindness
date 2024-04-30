import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppLayout from '../../components/AppLayout';
import Container from '../../components/Container';

const OurMissionScreen = () => {
  return (
    <AppLayout>
      <Container>
        <Text style={styles.headerText}>
          “No act of kindness, no matter how small, is ever wasted.“
        </Text>
        <Text style={styles.missionText}>Our Mission</Text>
        <Text style={{marginTop: 10}}>
          Why does kindness matter? It’s a feeling, an action, a moment. It
          releases oxytocin in both the person receiving kindness and the person
          who is giving. It is vital in times of crisis - especially as we face
          Covid-19.
        </Text>
        <Text style={{marginTop: 10}}>
          Social distancing has been a challenge. Despite our physical distance,
          we are still connected to each other in so many ways. We have seen
          kindness emerge all over our communities - both online and in person,
          between friends, neighbours, families, and strangers.
        </Text>
        <Text style={{marginTop: 10}}>
          The spirit of our community during this pandemic is that we are all in
          this together and we must help each other if we want to see the other
          side. This spirit of kindness in our communities is sacred and
          something we at See Kindness want to continue to nurture after
          coronavirus is a distant memory. Our mission is to create a long-term
          tool to help people cope with anxiety, fear and grief - both during
          this time of uncertainty and instability, and whatever may come.
        </Text>
        <Text style={{marginTop: 10}}>
          Soon we will have to decide what we want our new “normal” to look
          like. We hope that the acts of kindness we have seen all over our
          city, country and around the globe become a part of it.
        </Text>
      </Container>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#337A7F',
    fontSize: 20,
    fontStyle: 'italic',
  },
  missionText: {
    fontSize: 16,
    marginTop: 10,
  },
});
export default OurMissionScreen;
