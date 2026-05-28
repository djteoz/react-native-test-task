import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IIconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon: FC<IIconProps> = ({name, size = 22, color = '#007AFF'}) => (
  <View style={[styles.container, {width: size, height: size, borderRadius: size / 2, backgroundColor: color}]}>
    <Text style={[styles.label, {fontSize: size * 0.45}]}>{name.charAt(0).toUpperCase()}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

Icon.displayName = 'Icon';
