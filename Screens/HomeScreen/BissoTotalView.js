import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

export default function BissoTotalView({count}) {
  return (
    <View style={{padding: 10}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        BisOO
      </Text>
      <View
        style={{height: 0.5, backgroundColor: 'black', marginTop: 10}}></View>
      <Text style={{fontSize: 16, fontWeight: 'normal', color: '#337A7E'}}>
        ErinDobson just signed Vancouver is Kind BisOO
      </Text>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <View style={styles.circle}>
          <Text style={{fontSize: 33, color: 'black'}}>{count}</Text>
          <Text>
            TOTAL
            <Text style={{fontWeight: 'bold'}}>BisOO</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
