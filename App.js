import {Root} from 'native-base';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LocationEnabler from 'react-native-location-enabler';
import {PersistGate} from 'redux-persist/integration/react';

// import RNLocation from 'react-native-location';
import {Provider} from 'react-redux';
import Navigator from './Navigators';
import store, {persistor} from './store';
const {
  PRIORITIES: {HIGH_ACCURACY},
  useLocationSettings,
  addListener,
  requestResolutionSettings,
} = LocationEnabler;
// RNLocation.configure({
//   distanceFilter: null
//  })

const App = () => {
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY,
      alwaysShow: true,
      needBle: true,
    },
    false /* optional: default undefined */,
  );

  useEffect(() => {
    if (!enabled) {
      requestResolution();
    }

    // (async () => {
    //   let permission = await RNLocation.requestPermission({
    //     ios: 'whenInUse',
    //     android: {
    //       detail: 'coarse',
    //       rationale: {
    //         title: 'We need to access your location',
    //         message: 'We use your location to show where you are on the map',
    //         buttonPositive: 'OK',
    //         buttonNegative: 'Cancel',
    //       },
    //     },
    //   });
    //   console.log(permission);
    //   let location = await RNLocation.getLatestLocation({timeout: 100});
    //   console.log(
    //     location,
    //   );
    // })();
  }, []);
  return (
    <Root>
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigator />
          </PersistGate>
        </Provider>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});

export default App;
