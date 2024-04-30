import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const isGaranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position.coords);
          },
          error => {
            reject(error);
          },
          {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
        );
      } else {
        reject('ACCESS DENIED');
      }
    } catch (err) {
      reject(err);
    }
  });
};
