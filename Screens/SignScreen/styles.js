import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        height: 400,

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    postView: {
        // backgroundColor: '#FF9898',
        height: 200,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    text: {
        color: 'white',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 19,
        marginBottom: 10
    },
    textArea: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 5,
        flex: 1
    },
    postTextView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postButton: {
        flex: 0.3,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        // backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    boldText:{
        fontWeight:'bold'
    }
});

 