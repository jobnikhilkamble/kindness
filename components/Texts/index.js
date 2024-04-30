import React from 'react';

import {View, Text} from 'react-native';

export const BoldText = props => (
  <Text style={{fontWeight: 'bold', ...props.style}}>{props.children}</Text>
);


export const PrimaryText= props => (
    <Text style={{ color:'#337A7F', ...props.style}}>{props.children}</Text>
  );
  