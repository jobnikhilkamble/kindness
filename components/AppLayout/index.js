import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppFooter from '../AppFooter';
import AppHeader from '../AppHeader';
import {SCREEN_HEIGHT, MENU_ITEMS, SCREEN_WIDTH} from '../../constants';
import {Button, Spinner, Toast} from 'native-base';
import {useSelector} from 'react-redux';
import {showToaster} from '../../utils';
import {updateRawData} from '../../Reducers/actions';

const AppLayout = props => {
  const navigation = useNavigation();
  const showLoader = useSelector(state => state.rawData.showLoader);
  const toastObject = useSelector(state => state.rawData.toastObject || {});

  useEffect(() => {
    if (Object.keys(toastObject).length) {
      Toast.show({
        text: toastObject.message,
        type: toastObject.type,
        duration: toastObject.duration || 1000,
        position: 'top',
      });
      setTimeout(() => {
        updateRawData({toastObject: {}});
      }, toastObject.duration || 1000);
    }
  }, [JSON.stringify(toastObject)]);

  const onMenuItemSelected = route => {
    navigation.navigate(route);
  };

  return (
    <View style={{flex: 1}}>
      {showLoader && (
        <View style={styles.loader}>
          <View style={{marginTop: SCREEN_WIDTH}}>
            <Spinner accessibilityLabel="Loading posts" />
          </View>
        </View>
      )}
      <View elevation={5} style={[styles.square]}>
        <AppHeader onMenuItemSelected={onMenuItemSelected} />
      </View>
      <ScrollView style={{flex: 1, maxHeight: SCREEN_HEIGHT}}>
        {props.children}
        <AppFooter onMenuItemSelected={onMenuItemSelected} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    top: 0,
    backgroundColor: '#00000099',
    position: 'absolute',
    minHeight: SCREEN_HEIGHT * 50,
    width: SCREEN_WIDTH,
    zIndex: 111,
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  mainContainer: {
    flex: 1,
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
  },

  square: {
    backgroundColor: '#f8f9f8',
    // height: 0,
    paddingBottom: 10,
    paddingTop: 30,
    shadowColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppLayout;
