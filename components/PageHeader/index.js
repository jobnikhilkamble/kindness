import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { View, Text, StyleSheet } from 'react-native'

const PageHeader = (props) => {
    const { onBack = () => { }, showClose = true } = props
    return (
        <View style={styles.header}>
            <View onTouchEnd={onBack} style={styles.circle}>
                <Icon name="arrowleft" size={15} color={'black'} />
            </View>
            {props.children}
            {showClose &&<View onTouchEnd={onBack} style={styles.circle}>
                <Icon name="close" size={15} color={'black'} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 5
    },
    circle: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 2
    },

})

export default PageHeader
