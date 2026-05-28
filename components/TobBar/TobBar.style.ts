import {StyleSheet} from 'react-native';

export const BAR_HEIGHT = 44;
export const DEFAULT_TOP_INSET = 20;
export const MIN_TITLE_INSET = 16;
export const ACCENT_COLOR = '#FF453A';
export const HORIZONTAL_PADDING = 16;

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  sideSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: MIN_TITLE_INSET,
  },
  rightSection: {
    justifyContent: 'flex-end',
  },
  sideContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  title: {
    width: '100%',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: BAR_HEIGHT,
    marginLeft: -4,
    paddingRight: 4,
  },
  backChevron: {
    fontSize: 24,
    lineHeight: 24,
    color: ACCENT_COLOR,
    marginRight: 3,
    marginTop: -1,
  },
  backTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    color: ACCENT_COLOR,
  },
  actionButton: {
    width: 28,
    minHeight: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
