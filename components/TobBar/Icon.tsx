import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

import {TOBBAR_TOKENS} from './TobBar.tokens';

interface IIconProps {
  name: string;
  color?: string;
}

export const Icon: FC<IIconProps> = ({name: _name, color = TOBBAR_TOKENS.accentColor}) => (
  <Text style={[styles.plusIcon, {color}]}>+</Text>
);

const styles = StyleSheet.create({
  plusIcon: {
    width: TOBBAR_TOKENS.plusIcon.width,
    height: TOBBAR_TOKENS.plusIcon.height,
    fontSize: TOBBAR_TOKENS.plusIcon.fontSize,
    lineHeight: TOBBAR_TOKENS.plusIcon.lineHeight,
    fontWeight: TOBBAR_TOKENS.plusIcon.fontWeight,
    letterSpacing: TOBBAR_TOKENS.plusIcon.letterSpacing,
    textAlign: 'center',
  },
});

Icon.displayName = 'Icon';
