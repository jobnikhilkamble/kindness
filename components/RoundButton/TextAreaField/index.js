import React from 'react'
import { StyleSheet } from 'react-native'
import { Textarea } from 'native-base';

const TextAreaField = (props) => {
    const { placeholder } = props
    return (
        <Textarea
            style={styles.textArea}
            rowSpan={5}
            placeholder={placeholder} />

    )
}


export const styles = StyleSheet.create({

    textArea: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 5,
        flex: 1,
        borderWidth: 0.3
    },

});


export default TextAreaField
