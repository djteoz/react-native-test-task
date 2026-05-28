import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ACCENT_COLOR} from './TobBar.style';

interface IIconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon: FC<IIconProps> = ({name: _name, size = 22, color = ACCENT_COLOR}) => (
  <View style={[styles.container, {width: size, height: size}]}>
    <Text style={[styles.plus, {fontSize: size, lineHeight: size, color}]}>+</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontWeight: '300',
    textAlign: 'center',
  },
});

Icon.displayName = 'Icon';
