
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import RoundButton from '../RoundButton'
import {useNavigation} from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();

    return (
        <RoundButton
            onPress={() => navigation.navigate('SubscribeScreen')}
            customStyles={{width:100, height:30, backgroundColor: '#90b6b9'}}
        >
            <Text style={{ color: '#FFF' }}>SUBSCRIBE</Text>
        </RoundButton>
    )
}
