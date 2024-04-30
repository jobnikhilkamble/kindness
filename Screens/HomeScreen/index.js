import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AppLayout from '../../components/AppLayout';
import {styles} from './styles';
import MoreView from './MoreView';
import PostView from './PostView';
import BissoTotalView from './BissoTotalView';
import RoundButton from '../../components/RoundButton';
import {useNavigation} from '@react-navigation/core';
import BissoM from '../../assets/images/bisoo.png';
import kindnessM from '../../assets/images/kindnessM.png';
import MyLocation from '../../assets/images/my-location.png'
import {doGet} from '../../services/request';
import {usePost} from '../../hooks/usePost';
import {groupBy, showToaster} from '../../utils';
import {RenderCard, RenderCardToShow} from '../PurchaseBisooScreen/DesignInfo';
import {useCreatePost} from '../../hooks/useCreatePost';
import BisoInfoCard from './BisoInfoCard';
import {useSelector} from 'react-redux';
import {getCurrentLocation} from './helper';
import {updateRawData} from '../../Reducers/actions';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {loading, postList, error} = usePost();
  const [selectedBisso, setSelectedBisso] = useState(null);
  const useCreatePostProps = useCreatePost('bisoo');
  const userDetails = useSelector(state => state.rawData.userDetails) || {};
  const [signData, setSignData] = useState(null);
  const [user, setUser] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [post, setPost] = useState();
  const [latLng, setLatLng] = useState({lat: null, lng: null});

  const isFocused = useIsFocused();
  const postViewProps = {
    user,
    setUser,
    email,
    setEmail,
    post,
    setPost,
  };
  useEffect(() => {
    try {
      setCurrentLoc();
    } catch (err) {}
  }, [ postList.length]);

  const setCurrentLoc = async () => {
    try {
      const res = await getCurrentLocation();
      setLatLng({lat: res.latitude, lng: res.longitude});
    } catch (err) {}
  };

  useEffect(() => {
    // const {loading, postList, error} = usePost();
    setSignData(null);
    setSelectedBisso(null);
  }, [isFocused]);

  const {bisoo = [], act = []} = groupBy(postList, ({post_type}) => post_type);
  const onPostClicked = () => {
    navigation.navigate('PostKindness', {
      selectedBisso: selectedBisso,
      data: {post, user, email},
    });
  };
  let childrenIds = [];
  const {lat, lng} = latLng;
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
          {
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: lat || 18.5204,
                longitude: lng || 73.8567,
                latitudeDelta: 22.5726,
                longitudeDelta: 88.3639,
              }}>
              <ShowLocationMarker
                onSelect={bissoItem => {
                  setSelectedBisso(bissoItem);
                  setSignData(null);
                }}
                list={[...bisoo, ...act]}
              />
              {lat && lng && (
                <Marker
                  key={Math.random()}
                  coordinate={{
                    latitude: lat,
                    longitude: lng,
                  }}
                  icon={MyLocation}
                />
              )}
            </MapView>
          }
        </View>
        {selectedBisso?.metaData?.card_template && (
          <View
            ref={component => {
              childrenIds = component?._children[0]._children.map(
                el => el._nativeTag,
              );
            }}
            style={{position: 'absolute', marginTop: 60}}>
            <BisoInfoCard
              selectedBisso={selectedBisso}
              onSign={() => {
                navigation.navigate('SignABisoo', {
                  postList: bisoo,
                  signData: selectedBisso,
                });
              }}
            />
          </View>
        )}
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
        {!selectedBisso?.metaData?.card_template && (
          <>
            <BissoTotalView count={bisoo.length} />
            <View style={{padding: 10}}>
              <Text style={{fontWeight: '400', fontSize: 16}}>
                SIGN A <Text style={{fontWeight: 'bold'}}> BisOO</Text>
              </Text>
              <BisooSignCard
                onSelect={bissoItem =>
                  navigation.navigate('SignABisoo', {
                    postList: bisoo,
                    signData: bissoItem,
                  })
                }
                bisoo={bisoo}
              />
            </View>
          </>
        )}
      </View>
    </AppLayout>
  );
};

export default HomeScreen;

export const BisooSignCard = ({bisoo, onSelect}) =>
  bisoo.map(item => {
    const {post_id, metaData} = item;
    return (
      <View
        key={Math.random()}
        style={{marginTop: 10, borderBottomWidth: 0.3, height: 60}}>
        <View>
          <Text style={{fontWeight: 'bold', color: '#337A7E'}}>
            {metaData.main_header}
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
          key={Math.random()}
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
