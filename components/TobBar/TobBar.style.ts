import {Platform, StyleSheet} from 'react-native';

import {TOBBAR_TOKENS} from './TobBar.tokens';

export const BAR_HEIGHT = TOBBAR_TOKENS.barHeight;
export const DEFAULT_TOP_INSET = 20;

export default StyleSheet.create({
  container: {
    backgroundColor: TOBBAR_TOKENS.backgroundColor,
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleOnlySection: {
    flex: 1,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideFlex: {
    flex: 1,
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideWithPadding: {
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
  },
  rightWithActions: {
    justifyContent: 'flex-end',
    paddingRight: TOBBAR_TOKENS.rightEdgePadding,
    gap: TOBBAR_TOKENS.actionGap,
  },
  rightWithActionsAndBack: {
    paddingLeft: TOBBAR_TOKENS.sidePadding,
  },
  centerSection: {
    flexShrink: 0,
    height: BAR_HEIGHT,
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TOBBAR_TOKENS.title.fontSize,
    lineHeight: TOBBAR_TOKENS.title.lineHeight,
    fontWeight: TOBBAR_TOKENS.title.fontWeight,
    letterSpacing: TOBBAR_TOKENS.title.letterSpacing,
    color: TOBBAR_TOKENS.titleColor,
    textAlign: 'center',
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  },
  backChevron: {
    width: TOBBAR_TOKENS.backChevron.width,
    height: TOBBAR_TOKENS.backChevron.height,
    fontSize: TOBBAR_TOKENS.backChevron.fontSize,
    lineHeight: TOBBAR_TOKENS.backChevron.lineHeight,
    fontWeight: TOBBAR_TOKENS.backChevron.fontWeight,
    letterSpacing: TOBBAR_TOKENS.backChevron.letterSpacing,
    color: TOBBAR_TOKENS.accentColor,
    marginRight: 0,
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  backTitle: {
    flexShrink: 1,
    fontSize: TOBBAR_TOKENS.backTitle.fontSize,
    lineHeight: TOBBAR_TOKENS.backTitle.lineHeight,
    fontWeight: TOBBAR_TOKENS.backTitle.fontWeight,
    letterSpacing: TOBBAR_TOKENS.backTitle.letterSpacing,
    color: TOBBAR_TOKENS.accentColor,
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  actionButton: {
    width: TOBBAR_TOKENS.actionButtonSize,
    height: TOBBAR_TOKENS.actionButtonSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
