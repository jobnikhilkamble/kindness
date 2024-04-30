import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
 import MoreExpandView from './MoreExpandView'

const MoreView = () => {
    const [expand, setExpand] = useState(false)
    return (
        <View style={{ backgroundColor: '#FFECD5', paddingVertical: 10, }}>
            <View style={{ backgroundColor: '#FFECD5', paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ marginLeft: 100, fontWeight: 'bold' }}>WELCOME TO SEE KINDNESS</Text>
                <View style={{ marginLeft: 40, marginRight: 20, flexDirection: 'row' }} onTouchEnd={() => setExpand(!expand)}>
                    <Icon name={expand ? "caret-up" : "caret-down"} size={20} />

                    <Text style={{ marginRight: 10, marginLeft: 5 }}>
                        {expand ? 'LESS' : 'More'}
                    </Text>
                </View>
            </View>

            {expand &&
                <MoreExpandView />
            }
        </View>
    )
}

export default MoreView
