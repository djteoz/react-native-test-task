import {StyleSheet} from 'react-native';

export const BAR_HEIGHT = 44;
export const DEFAULT_TOP_INSET = 20;

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(60, 60, 67, 0.29)',
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sideSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
  },
  rightSection: {
    justifyContent: 'flex-end',
  },
  titleContainer: {
    position: 'absolute',
    left: 72,
    right: 72,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: BAR_HEIGHT,
    paddingHorizontal: 8,
  },
  backChevron: {
    fontSize: 28,
    lineHeight: 28,
    color: '#007AFF',
    marginRight: 2,
    marginTop: -2,
  },
  backTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#007AFF',
  },
  actionButton: {
    minWidth: BAR_HEIGHT,
    minHeight: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
