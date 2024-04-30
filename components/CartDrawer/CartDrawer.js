import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/AntDesign';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import Container from '../Container';
import {BoldText, PrimaryText} from '../Texts';

const CartDrawer = ({useCreatePostProps}) => {
  const [show, setShow] = useState(false);
  const {
    state: {postMeta},
  } = useCreatePostProps;

  const onToggle = () => {
    setShow(!show);
  };

  const senderInfo = useCreatePostProps.state.senderInfo;
  const receiverInfo = useCreatePostProps.state.receiverInfo;

  const sendermail = senderInfo.map(item => item.mail).join();
  const recipientemail = receiverInfo.map(item => item.mail).join();
  return (
    <View style={[styles.container, !show ? styles.close : {}]}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          onPress={onToggle}
          name="shoppingcart"
          size={36}
          style={{
            backgroundColor: 'white',
            borderRightWidth: 0,
            height: 50,
            padding: 5,
            color: '#337A7F',
            borderWidth: 1,
            borderBottomLeftRadius: 12,
            borderColor: '#cccccc',
            shadowColor: 'black',
          }}
        />
        {show && (
          <View style={styles.drawer}>
            <Container>
              <PrimaryText style={{fontSize: 16}}>Card Details</PrimaryText>

              <BoldText>Card Type</BoldText>
              <Text>{postMeta.type || 'Small Card, 1-25 signatures'}</Text>

              <BoldText style={{marginTop: 10}}>URL</BoldText>
              <Text>
                {postMeta.custom_url_price === '$5' ? 'Custom' : '$0'}
              </Text>

              <BoldText style={{marginTop: 10}}>Live Time</BoldText>
              <Text>{postMeta.card_live_time}</Text>

              <BoldText style={{marginTop: 10}}>
                Signature Collection Timeframe
              </BoldText>
              <Text>
                Closing{' '}
                {postMeta.selectedOption === 'DATE'
                  ? 'on' + postMeta?.selectedDate?.toISOString().slice(0, 10)
                  : `after ${postMeta.numberofsignature}`}
              </Text>

              <BoldText style={{marginTop: 10}}>Recipient(s)</BoldText>
              <Text>{sendermail}</Text>

              <BoldText style={{marginTop: 10}}>Sender(s)</BoldText>
              <Text>{recipientemail}</Text>

              <BoldText style={{marginTop: 10}}>Card Signing</BoldText>
              <Text>{postMeta.card_signing}</Text>

              <PrimaryText style={{fontSize: 20, marginTop: 50}}>
                Order Summary
              </PrimaryText>
              <BoldText style={{marginTop: 10, fontSize: 18}}>
                SUBTOTAL
              </BoldText>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <BoldText style={{fontSize: 12, flex: 1}}>
                  Kindness Card - Small
                </BoldText>
                <BoldText>{postMeta.bisoo_price}</BoldText>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <BoldText style={{fontSize: 12, flex: 1}}>Signature Price</BoldText>
                <BoldText>{postMeta.signature_price}</BoldText>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <BoldText style={{fontSize: 12, flex: 1}}>Custom URL</BoldText>
                <BoldText>{postMeta.custom_url_price}</BoldText>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <BoldText style={{fontSize: 12, flex: 1}}>
                  Live Time - {postMeta.card_live_time}
                </BoldText>
                <BoldText>{postMeta.live_time_price}</BoldText>
              </View>

              <View
                style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                <BoldText style={{fontSize: 12, flex: 1}}>Taxes</BoldText>
                <BoldText>$0.00</BoldText>
              </View>

              <MenuDivider />
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <BoldText style={{fontSize: 12, flex: 1}}>TOTAL</BoldText>
                <BoldText>{getTotal(postMeta)}</BoldText>
              </View>
            </Container>
          </View>
        )}
      </View>
    </View>
  );
};

export const getTotal = ({
  bisoo_price = '$0',
  live_time_price = '$0',
  signature_price = '$0',
  custom_url_price = '$0',
}) => {
  return (
    '$' +
    (Number(bisoo_price.replace('$', '')) +
      Number(live_time_price.replace('$', '')) +
      Number(signature_price.replace('$', '')) +
      Number(custom_url_price.replace('$', '')))
  );
};

const styles = StyleSheet.create({
  close: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row-reverse',
    position: 'absolute',
    right: 0,
    zIndex: 11111,
    backgroundColor: '#000000aa',
    width: SCREEN_WIDTH,
    elevation: 5,
    // marginTop:500
  },
  drawer: {
    width: SCREEN_WIDTH - 120,
    height: SCREEN_HEIGHT * 2,
    backgroundColor: 'white',
  },
});

export default CartDrawer;
