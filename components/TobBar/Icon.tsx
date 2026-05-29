import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {TOBBAR_TOKENS} from './TobBar.tokens';

interface IIconProps {
  name: string;
  color?: string;
}

export const Icon: FC<IIconProps> = ({name: _name, color = TOBBAR_TOKENS.accentColor}) => {
  const {vectorSize, strokeWidth} = TOBBAR_TOKENS.plusIcon;

  return (
    <View style={styles.plusGlyphBox}>
      <View
        style={[
          styles.plusLine,
          {
            backgroundColor: color,
            borderRadius: strokeWidth / 2,
            height: strokeWidth,
            width: vectorSize,
          },
        ]}
      />
      <View
        style={[
          styles.plusLine,
          {
            backgroundColor: color,
            borderRadius: strokeWidth / 2,
            height: vectorSize,
            width: strokeWidth,
          },
        ]}
      />
    </View>
  );
};

export const ChevronLeftIcon: FC<{color?: string}> = ({color = TOBBAR_TOKENS.accentColor}) => (
  <View style={styles.chevronGlyphBox}>
    <View
      style={[
        styles.chevronLine,
        styles.chevronTopLine,
        {backgroundColor: color},
      ]}
    />
    <View
      style={[
        styles.chevronLine,
        styles.chevronBottomLine,
        {backgroundColor: color},
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  chevronGlyphBox: {
    width: TOBBAR_TOKENS.backChevron.width,
    height: TOBBAR_TOKENS.backChevron.height,
    position: 'relative',
  },
  chevronLine: {
    position: 'absolute',
    left: 1.4,
    width: 12.4,
    height: 2.75,
    borderRadius: 1.38,
  },
  chevronTopLine: {
    top: 7.2,
    transform: [{rotate: '-45deg'}],
  },
  chevronBottomLine: {
    bottom: 7.2,
    transform: [{rotate: '45deg'}],
  },
  plusGlyphBox: {
    width: TOBBAR_TOKENS.plusIcon.width,
    height: TOBBAR_TOKENS.plusIcon.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusLine: {
    position: 'absolute',
  },
});

Icon.displayName = 'Icon';
