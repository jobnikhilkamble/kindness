import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import { View, Text } from 'react-native'

const PushNotificationComponent = () => {
    useEffect(() => {
        Firebase.initializeApp(this);

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert('A new FCM message arrived!', remoteMessage.notification.body);
        });

        PushNotification.configure({
            onRegister: function (token) { },

            onNotification: function (notification) { },

            onAction: function (notification) { },

            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,
            requestPermissions: true,
        });
        return unsubscribe;
    }, [])
    return (
        < >
        </>
    )
}

export default PushNotificationComponent
