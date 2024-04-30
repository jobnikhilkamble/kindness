import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AppLayout from '../../components/AppLayout';
import Container from '../../components/Container';
import InputField from '../../components/Input';
import RoundButton from '../../components/RoundButton';
import TextAreaField from '../../components/TextAreaField';

const LearnMoreItem = ({text}) => {
  return (
    <View style={styles.listItem}>
      <Text style={{flex: 1}}>{text}</Text>
      <Icon name="caretright" style={{color: '#357B7F'}} size={20} />
    </View>
  );
};

const LearnMoreScreen = () => {
  return (
    <AppLayout>
      <Container>
        <Text style={styles.headerText}>About SeeKindness</Text>
        <Text style={{marginTop: 10, fontSize: 16}}>
          Kindness is the antidote to anxiety, stress, and disconnection. There
          are many benefits of sharing acts of kindness on SeeKindness
          including:
        </Text>
        <Text style={{marginTop: 10}}>
          • you receive a boost in oxytocin as does anyone who readsyour post
        </Text>
        <Text style={{marginTop: 10}}>
          • you inspire others to pay it forward
        </Text>
        <Text style={{marginTop: 10}}>
          • you create an online space for people to feel safe.
        </Text>
        <Text style={{marginTop: 10, fontSize: 16}}>
          We want to create a global map of kindness and that starts with you
          sharing your kindness stories and pinning them to the map where they
          took place. You can share about an act of kindness you did for someone
          else, an act of kindness you witnessed, or something someone else has
          done for you.
        </Text>
        <Text style={{...styles.headerText, marginTop: 10}}>Learn More</Text>
      </Container>
      <View style={styles.textItems}>
        <LearnMoreItem text={'How do I add my location to my posts?'} />
        <LearnMoreItem
          text={'Am I able to share my Acts on my other social media accounts?'}
        />
        <LearnMoreItem
          text={'Am I able to share my Acts on my other social media accounts?'}
        />
        <LearnMoreItem
          text={'How do I share my location with Seeing Kindness for my posts?'}
        />
        <LearnMoreItem
          text={'Is Sharing Kindness just for the time of COVID-19?'}
        />
        <LearnMoreItem
          text={
            'How do I share my location with Seeing Kindness for my posts? '
          }
        />
      </View>
      <Container>
        <Text style={styles.headerText}>Have a Question or Suggestion?</Text>
        <Text>We would love to hear from you.</Text>
        <View style={{marginTop: 10}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>Name</Text>
            <InputField placeholder={'Enter Name'} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>Email</Text>
            <InputField placeholder={'Enter Email'} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>Question or Suggestion</Text>
            <TextAreaField
              customStyles={{borderRadius: 0}}
              placeholder={'Enter Question or Suggestion'}
            />
          </View>
          <View style={{marginTop: 10}}>
            <RoundButton customStyles={{width: 104, height: 30}}>
              <Text>Send</Text>
            </RoundButton>
          </View>
        </View>
      </Container>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  textItems: {
    elevation: 5,
    backgroundColor:'white'
  },
  headerText: {
    color: 'black',
    fontSize: 20,
  },
  missionText: {
    fontSize: 16,
    marginTop: 40,
  },
  listItem: {
    padding: 10,
    borderTopWidth: 1,
    height: 60,
    flexDirection: 'row',
    borderColor:'#cccccc'
  },
});
export default LearnMoreScreen;
