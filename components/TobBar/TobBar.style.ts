import {Platform, StyleSheet} from 'react-native';

import {TOBBAR_TOKENS} from './TobBar.tokens';

export const BAR_HEIGHT = TOBBAR_TOKENS.barHeight;
export const DEFAULT_TOP_INSET = 20;

export default StyleSheet.create({
  container: {
    width: TOBBAR_TOKENS.barWidth,
    alignSelf: 'center',
    backgroundColor: TOBBAR_TOKENS.backgroundColor,
    overflow: 'hidden',
  },
  bar: {
    width: TOBBAR_TOKENS.barWidth,
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
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
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
  },
  sideWithPadding: {
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
  },
  rightWithActions: {
    justifyContent: 'flex-end',
    paddingLeft: 0,
    paddingRight: TOBBAR_TOKENS.rightEdgePadding,
    gap: TOBBAR_TOKENS.actionGap,
  },
  rightWithActionsAndBack: {
    paddingLeft: TOBBAR_TOKENS.sidePadding,
  },
  centerSection: {
    flexShrink: 0,
    width: TOBBAR_TOKENS.centerSectionWidth,
    height: BAR_HEIGHT,
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: TOBBAR_TOKENS.title.width,
    height: TOBBAR_TOKENS.title.height,
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
    width: TOBBAR_TOKENS.backButton.width,
    height: TOBBAR_TOKENS.backButton.height,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: TOBBAR_TOKENS.backTitle.width,
    height: TOBBAR_TOKENS.backTitle.height,
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
