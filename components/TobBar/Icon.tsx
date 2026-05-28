import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

import {ACCENT_COLOR} from './TobBar.style';

interface IIconProps {
  name: string;
  color?: string;
}

export const Icon: FC<IIconProps> = ({name: _name, color = ACCENT_COLOR}) => (
  <Text style={[styles.icon, {color}]}>+</Text>
);

const styles = StyleSheet.create({
  icon: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.43,
    textAlign: 'center',
  },
});

Icon.displayName = 'Icon';
