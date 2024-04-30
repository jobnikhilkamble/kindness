import React from 'react'
import { View, Text } from 'react-native'
import RoundButton from '../../components/RoundButton'

export default function MoreExpandView() {
    return (
        <View style={{ paddingHorizontal: 10, }}>
            <Text style={{ fontWeight: '400' }}>
                SeeKindness is a place to document acts of kindness happening globally. See it. Share it. Inspire others.
        </Text>
            <Text style={{ fontWeight: '400', marginTop: 10 }}>
                You can do more! Create a BiOO to collect messages to show your appreciation for someone special
         </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>

                <RoundButton customStyles={{ width: 150, height: 35 }}   >
                    <Text style={{ color: '#337A7E' }}>LEARN MORE</Text>
                </RoundButton>

                <RoundButton customStyles={{ backgroundColor: '#B4224F', marginLeft: 10, width: 160, height: 35 }}>
                    <Text style={{ color: 'white' }}>SEND A
            </Text>
                    <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 5 }}>
                        BisOO
            </Text>
                </RoundButton>
            </View>
        </View>
    )
}
