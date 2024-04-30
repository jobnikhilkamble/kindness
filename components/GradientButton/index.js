import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const GradientButton = (props) => {
    const { onPress = () => { }, disabled,text, styles = {}, colors} = props
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{ height: 30, ...styles }}>
            <LinearGradient colors={colors || ['#FF9898', '#FF5579'] } style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 50, height: '100%' }} >
                <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: 16 }}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientButton
