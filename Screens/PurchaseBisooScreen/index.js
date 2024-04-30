import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppLayout from '../../components/AppLayout';
import Container from '../../components/Container';
import RoundButton from '../../components/RoundButton';
import AddOns from './AddOns';
import DatesInfo from './DatesInfo';
import DesignInfo from './DesignInfo';
import InfoForm from './InfoForm';
import {
  addOrUpdateRecipientDetails,
  useCreatePost,
  addOrUpdateSenderDetails,
  addUpdatePostMetaAction,
} from './../../hooks/useCreatePost';
import CartDrawer from '../../components/CartDrawer/CartDrawer';
import {useSelector} from 'react-redux';
import {updateRawData} from '../../Reducers/actions';
import CheckoutScreen from '../CheckoutScreen';
import {getTotal} from './../../components/CartDrawer/CartDrawer';
import {isValidEmail, showToaster} from '../../utils';
import ThankyouScreen from './ThankyouScreen';
import {uploadImage} from './../../services/request';

const PurchaseBisooScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigation = useNavigation();
  const useCreatePostProps = useCreatePost('bisoo');
  const rawData = useSelector(state => state.rawData);
  const {disableNext} = rawData;

  const [senderName, setSenderName] = useState();
  const [senderMail, setSenderMail] = useState();
  const [rname, setRname] = useState();
  const [rmail, setRmail] = useState();
  const [post, setPost] = useState();

  const addSender = () => {
    console.log(senderName, senderMail);
    if (!senderName || !senderMail) {
      showToaster('Sender name and email should not be empty.', {
        type: 'danger',
        duration: 2000,
      });
      return;
    }

    if (!isValidEmail(senderMail)) {
      showToaster('Sender Email is not valid.', {
        type: 'danger',
        duration: 2000,
      });
      return;
    }
    addOrUpdateSenderDetails(useCreatePostProps.dispatch, {
      data: {name: senderName, mail: senderMail},
    });
    setSenderName('');
    setSenderMail('');
  };

  const addRei = () => {
    if (!rname || !rmail) {
      showToaster('Receipent name and email should not be empty.', {
        type: 'danger',
        duration: 1000,
      });
      return;
    }

    if (!isValidEmail(rmail)) {
      showToaster('Receipent Email is not valid.', {
        type: 'danger',
        duration: 1000,
      });
      return;
    }
    addOrUpdateRecipientDetails(useCreatePostProps.dispatch, {
      data: {name: rname, mail: rmail},
    });
    setRname('');
    setRmail('');
  };

  const senderInfo = useCreatePostProps.state.senderInfo;
  const receiverInfo = useCreatePostProps.state.receiverInfo;

  const infoProps = {
    senderName,
    setSenderName,
    senderMail,
    setSenderMail,
    rname,
    setRname,
    rmail,
    setRmail,
    addSender,
    addRei,
    senderInfo,
    receiverInfo,
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (currentStep === 6) {
    return (
      <ThankyouScreen {...useCreatePostProps.state.postMeta} post={post} />
    );
  }

  if (currentStep === 5) {
    return (
      <CheckoutScreen
        amount={getTotal(useCreatePostProps.state.postMeta)}
        onPayment={async () => {
          const selectedImage = useCreatePostProps.state.postMeta.selectedImage;
          const response = await useCreatePostProps.addUpdatePost();

          if (response.data) {
            await uploadImage(selectedImage, response.post);
            setPost(response.data);
            setCurrentStep(6);
          }
        }}
        {...useCreatePostProps.state.postMeta}
      />
    );
  }

  const uploadImageForBisoo = async selectedImage => {
    const data = await uploadImage(
      selectedImage,
      useCreatePostProps.state.auther_id,
    );

    console.log('guid', data.guid);

    addUpdatePostMetaAction(useCreatePostProps.dispatch, {
      _wp_attached_file: data.guid,
    });
  };

  return (
    <AppLayout>
      <Container style={{paddingTop: 60}}>
        <CartDrawer useCreatePostProps={useCreatePostProps} />
        <Text style={styles.headerText}> Purchase BisOO </Text>
        <View style={styles.progress}>
          <View
            style={{...styles.progressItem, flex: 0.25 * currentStep}}></View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.progressStep}>TO/FROM</Text>
          <Text style={styles.progressStep}>DESIGN</Text>
          <Text style={styles.progressStep}>SET DATES & PRIVACY</Text>
          <Text style={styles.progressStep}> ADD ON’S</Text>
        </View>
        <View style={{marginTop: 20}}>
          {currentStep === 1 && (
            <InfoForm
              useCreatePostProps={useCreatePostProps}
              infoProps={infoProps}
            />
          )}
          {currentStep === 2 && (
            <DesignInfo
              uploadImageForBisoo={uploadImageForBisoo}
              useCreatePostProps={useCreatePostProps}
            />
          )}
          {currentStep === 3 && (
            <DatesInfo useCreatePostProps={useCreatePostProps} />
          )}
          {currentStep === 4 && (
            <AddOns useCreatePostProps={useCreatePostProps} />
          )}
        </View>

        <View style={{flexDirection: 'row', marginTop: 10, zIndex: 1}}>
          <RoundButton
            onPress={() => {
              updateRawData({disableNext: false});

              currentStep !== 1 ? setCurrentStep(currentStep - 1) : goBack();
            }}
            customStyles={{flex: 1, height: 30}}>
            <Text>BACK</Text>
          </RoundButton>
          <RoundButton
            // disabled={disableNext || !senderInfo.length || !receiverInfo.length}
            onPress={() => {
              setCurrentStep(currentStep + 1);
            }}
            customStyles={{
              flex: 1,
              height: 30,
              backgroundColor: '#2F7A80',
              marginLeft: 10,
            }}>
            <Text style={{color: 'white'}}>
              {currentStep === 4 ? 'PROCEED TO CHECKOUT' : 'NEXT'}
            </Text>
          </RoundButton>
        </View>
      </Container>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 2,
    width: 22,
    marginTop: 2,
  },

  progressStep: {
    textAlign: 'center',
    alignContent: 'center',
    marginLeft: 10,
    flex: 1,
    color: 'black',
    opacity: 0.6,
  },
  headerText: {
    fontSize: 30,
    color: 'black',
  },
  progress: {
    marginTop: 20,
    borderWidth: 1,
    height: 20,
    borderRadius: 10,
    borderColor: '#cccccc',
    flexDirection: 'row',
  },
  progressItem: {
    borderRadius: 30,
    height: 20,
    backgroundColor: '#C8DCD2',
    flex: 1,
  },
});
export default PurchaseBisooScreen;
