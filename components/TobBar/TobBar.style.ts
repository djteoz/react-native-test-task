import {Platform, StyleSheet} from 'react-native';

import {TOBBAR_TOKENS} from './TobBar.tokens';

export const BAR_HEIGHT = TOBBAR_TOKENS.barHeight;
export const DEFAULT_TOP_INSET = 20;

export default StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: TOBBAR_TOKENS.backgroundColor,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    height: BAR_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  leftControls: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
    zIndex: 1,
  },
  sideWithPadding: {
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
  },
  rightControls: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: TOBBAR_TOKENS.sidePadding,
    zIndex: 1,
  },
  rightWithActions: {
    paddingLeft: 0,
    paddingRight: TOBBAR_TOKENS.rightEdgePadding,
    gap: TOBBAR_TOKENS.actionGap,
  },
  rightWithActionsAndBack: {
    paddingLeft: TOBBAR_TOKENS.sidePadding,
  },
  centerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: BAR_HEIGHT,
    paddingHorizontal: TOBBAR_TOKENS.centerSideGuard,
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
