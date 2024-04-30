import React from 'react'
import { View, StyleSheet } from 'react-native'

const DrawerContent = () => {
    return (
        <View>
            <View style={styles.header} />
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#357B7F',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
        height: 150
    },

})
export default DrawerContent
