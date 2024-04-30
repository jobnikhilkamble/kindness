import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AppLayout from '../../components/AppLayout';
import {styles} from './styles';
import MoreView from './MoreView';
import PostView from './PostView';
import BissoTotalView from './BissoTotalView';
import RoundButton from '../../components/RoundButton';
import {useNavigation} from '@react-navigation/core';
import BissoM from '../../assets/images/bissom.png';
import kindnessM from '../../assets/images/kindnessM.png';
import {groupBy} from '../../utils';
import {RenderCardToShow} from '../PurchaseBisooScreen/DesignInfo';
import {useSelector} from 'react-redux';

const SignABisoo = ({route}) => {
  const {postList = [], signData = []} = route.params;
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.rawData.userDetails) || {};
  const [user, setUser] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [post, setPost] = useState();

  const postViewProps = {
    user,
    setUser,
    email,
    setEmail,
    post,
    setPost,
  };

  const onPostClicked = () => {
    navigation.navigate('PostKindness', {
      selectedBisso: signData,
      data: {post, user, email},
    });
  };
  let childrenIds = [];
  return (
    <AppLayout>
      <View
        onStartShouldSetResponder={evt => {
          evt.persist();
          if (childrenIds && childrenIds.length) {
            if (childrenIds.includes(evt.target)) {
              return;
            }
          }
        }}>
        <MoreView />
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 18.5204,
              longitude: 73.8567,
              latitudeDelta: 22.5726,
              longitudeDelta: 88.3639,
            }}>
            <ShowLocationMarker list={postList} />
          </MapView>
        </View>
        {signData?.metaData?.card_template && (
          <View style={{height: 'auto'}}>
            <RenderCardToShow
              card_template={signData?.metaData?.card_template}
              {...signData.metaData}
            />
          </View>
        )}

        <PostView
          onPost={onPostClicked}
          showPostForm={!signData?.metaData?.card_template}
          postViewProps={postViewProps}
        />
      </View>
    </AppLayout>
  );
};

export default SignABisoo;

export const BisooSignCard = ({bisoo, onSelect}) =>
  bisoo.map(item => {
    const {post_id, post_name} = item;
    return (
      <View
        key={post_id}
        style={{marginTop: 10, borderBottomWidth: 0.3, height: 60}}>
        <View>
          <Text style={{fontWeight: 'bold', color: '#337A7E'}}>
            {post_name}
          </Text>

          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, color: '#979797', flex: 1}}>
                98/100 Signatures Closing in 3 Days
              </Text>
              <RoundButton
                onPress={() => onSelect(item)}
                customStyles={{width: 100, height: 30}}>
                <Text>SIGN</Text>
              </RoundButton>
            </View>
          </View>
        </View>
      </View>
    );
  });

const setIcon = ins => {
  switch (ins.post_type) {
    case 'bisoo':
      return BissoM;

    case 'act':
      return kindnessM;

    default:
      break;
  }
};

export const ShowLocationMarker = ({list, onSelect = () => {}}) => {
  return list.reduce((jsxList, ins) => {
    if (ins.metaData.latitude && ins.metaData.longitude) {
      jsxList = [
        ...jsxList,
        <Marker
          onPress={() => {
            onSelect(ins);
          }}
          key={ins.post_id}
          coordinate={{
            latitude: Number(ins.metaData.latitude),
            longitude: Number(ins.metaData.longitude),
          }}
          icon={setIcon(ins)}
        />,
      ];
    }

    return jsxList;
  }, []);
};
