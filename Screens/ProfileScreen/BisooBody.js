import React, {useState} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {GetBisooCard} from './../PurchaseBisooScreen/DisgnInfoComponents/GetBisooCard';
import {RenderCardToShow} from './../PurchaseBisooScreen/DesignInfo';

export const BisooBody = ({bisooList = []}) => {
  const [selectedBisoo, setSelectedBisoo] = useState(
    bisooList.length ? bisooList[0] : {},
  );

  const BisooDetails = () => {
    return (
      <View style={styles.bisooDetailsBg}>
        <View
          style={{
            borderWidth: 1,
            padding: 3,
            borderColor: 'black',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Picker
            selectedValue={selectedBisoo.id}
            style={{height: 20, width: '100%', backgroundColor: '#fff'}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedBisoo(bisooList[itemIndex])
            }>
            {bisooList.map(({id, post_name}, index) => (
              <Picker.Item key={index} label={post_name} value={id} />
            ))}
          </Picker>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
          <View style={{width: '30%'}}>
            {[
              {label: 'Signatures', value: '10/100'},
              {label: 'Likes', value: '10/100'},
              {label: 'Comments', value: '10/100'},
              {label: 'Shared', value: '10/100'},
              {label: 'Closing', value: '10/100'},
            ].map(({label, value}, index) => (
              <View key={index} style={styles.bisooDetailsRow}>
                <Text style={{color: '#337A7F', paddingLeft: 5}}>{value}</Text>
                <Text style={{fontSize: 12}}>{label}</Text>
              </View>
            ))}
          </View>
          <View style={{width: '70%', marginLeft: 10}}>
            <RenderCardToShow
              {...selectedBisoo.metaData}
            />
          </View>
          <View></View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <BisooDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  bisooDetailsBg: {
    backgroundColor: '#C8DCD240',
    height: 200,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bisooDetailsRow: {
    flexDirection: 'row-reverse',
    marginTop: 5,
    marginBottom: 5,
  },
});
