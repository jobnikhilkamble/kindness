
import React from 'react'
import { useNavigation } from '@react-navigation/core'

import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SubscribeButton from '../Buttons/SubscribeButton'
import RoundButton from '../RoundButton'

const SOCIAL_MEDIA = [
    "twitter",
    "linkedin",
    "instagram",
    "facebook"
]


const AppFooter = () => {
    const navigation = useNavigation();
     
    return (
        <View style={styles.footer}>
            <View style={styles.footerColumn}>
                <View style={styles.socialMediaSection}>
                    {SOCIAL_MEDIA.map((media, index) =>
                        <View style={{ ...styles.socialMedia, marginTop: index === 0 ? 0 : 5 }} key={media}>
                            <Icon name={media} />
                        </View>)}

                </View>
                <View style={styles.donateView}>
                    <Text style={{ color: 'white' }}>Show Us Some Kindness</Text>
                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ color: 'white', fontSize: 11, marginRight: 5 }}>
                            LEARN MORE
                        </Text>
                        <Text style={{ color: 'white', fontSize: 10 }}>
                            about how your donations
                    </Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 10 }}>
                        can make the world a better place
                    </Text>
                    <RoundButton onPress={() => navigation.navigate('DonationScreen')} customStyles={{width:100,height:30,marginTop:15, alignSelf: 'flex-start'}}>
                        <Text style={{ color: '#2F7A80' }}>DONATE</Text>
                    </RoundButton>
                </View>
            </View>
            <View style={{...styles.footerColumn, flexDirection: 'row-reverse'}}>
                <View>
                    <SubscribeButton/>
                    <Text style={{ color: 'white', fontSize: 11,  alignSelf: 'flex-end', marginTop: 17, textDecorationLine:  'underline' }}>
                        Community Guidelines
                    </Text>
                    <Text style={{ color: 'white', fontSize: 11,  alignSelf: 'flex-end', textDecorationLine:  'underline' }}>
                        Privacy Policy
                    </Text>
                    <Text style={{ color: 'white', fontSize: 11, alignSelf: 'flex-end', textDecorationLine:  'underline'  }}>
                        Terms of Service
                    </Text>
                    
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    donateView: {
        marginLeft: 10
    },
    footer: {
        backgroundColor: '#357B7F',
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 10,
        paddingBottom: 20
    },
    footerColumn: {
         flexDirection: 'row',
         width: '50%'
    },
    socialMediaSection: {
        marginLeft: 10,
    },
    socialMedia: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#357B7F',
        marginTop: 10
    },
})
export default AppFooter
