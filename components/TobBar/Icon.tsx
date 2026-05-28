import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {TOBBAR_TOKENS} from './TobBar.tokens';

interface IIconProps {
  name: string;
  color?: string;
}

export const Icon: FC<IIconProps> = ({name: _name, color = TOBBAR_TOKENS.accentColor}) => (
  <PlusIcon color={color} />
);

interface IGlyphProps {
  color?: string;
}

export const ChevronLeftIcon: FC<IGlyphProps> = ({color = TOBBAR_TOKENS.accentColor}) => (
  <View style={[styles.chevronBox, {width: TOBBAR_TOKENS.chevron.width, height: TOBBAR_TOKENS.chevron.height}]}>
    <View
      style={[
        styles.chevronArm,
        {
          backgroundColor: color,
          height: TOBBAR_TOKENS.chevron.strokeWidth,
          width: TOBBAR_TOKENS.chevron.height * 0.55,
          top: TOBBAR_TOKENS.chevron.height * 0.14,
          transform: [{rotate: '-45deg'}],
        },
      ]}
    />
    <View
      style={[
        styles.chevronArm,
        {
          backgroundColor: color,
          height: TOBBAR_TOKENS.chevron.strokeWidth,
          width: TOBBAR_TOKENS.chevron.height * 0.55,
          bottom: TOBBAR_TOKENS.chevron.height * 0.14,
          transform: [{rotate: '45deg'}],
        },
      ]}
    />
  </View>
);

export const PlusIcon: FC<IGlyphProps> = ({color = TOBBAR_TOKENS.accentColor}) => {
  const {size, strokeWidth} = TOBBAR_TOKENS.plusIcon;

  return (
    <View style={[styles.plusBox, {width: size, height: size}]}>
      <View style={[styles.plusLine, {backgroundColor: color, width: size, height: strokeWidth}]} />
      <View style={[styles.plusLine, {backgroundColor: color, width: strokeWidth, height: size}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  chevronBox: {
    position: 'relative',
    marginRight: 1,
  },
  chevronArm: {
    position: 'absolute',
    left: 0,
    borderRadius: 1,
  },
  plusBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusLine: {
    position: 'absolute',
    borderRadius: 1,
  },
});

Icon.displayName = 'Icon';
