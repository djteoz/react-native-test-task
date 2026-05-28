import {StyleSheet} from 'react-native';

export const BAR_HEIGHT = 44;
export const DEFAULT_TOP_INSET = 20;
export const ACCENT_COLOR = '#F9627D';
export const SIDE_PADDING = 16;
export const RIGHT_EDGE_PADDING = 3;
export const ACTION_GAP = 3;
export const ACTION_BUTTON_SIZE = 44;

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: BAR_HEIGHT,
    paddingHorizontal: SIDE_PADDING,
  },
  centerSection: {
    flexShrink: 1,
    minWidth: 0,
    paddingHorizontal: SIDE_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: BAR_HEIGHT,
    gap: ACTION_GAP,
    paddingLeft: SIDE_PADDING,
    paddingRight: RIGHT_EDGE_PADDING,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.43,
    color: '#000000',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backChevron: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.36,
    color: ACCENT_COLOR,
  },
  backTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.43,
    color: ACCENT_COLOR,
  },
  actionButton: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
