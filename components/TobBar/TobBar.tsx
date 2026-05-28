import React, {FC, useCallback, useState} from 'react';
import {LayoutChangeEvent, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Icon} from './Icon';
import styles, {DEFAULT_TOP_INSET} from './TobBar.style';
import {ITobBarController} from './TobBar.model';

export const TobBar: FC<ITobBarController> = (props) => {
  const {title, backTitle, onBackPress, buttons = []} = props;
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  const hasBack = Boolean(backTitle);
  const hasActions = buttons.length > 0;
  const isTitleOnly = !hasBack && !hasActions;

  const handleLeftLayout = useCallback((event: LayoutChangeEvent) => {
    setLeftWidth(event.nativeEvent.layout.width);
  }, []);

  const handleRightLayout = useCallback((event: LayoutChangeEvent) => {
    setRightWidth(event.nativeEvent.layout.width);
  }, []);

  const titleInset = Math.max(leftWidth, rightWidth);

  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, onBackPress]);

  const paddingTop = top > 0 ? top : DEFAULT_TOP_INSET;

  if (isTitleOnly) {
    return (
      <View style={[styles.container, {paddingTop}]}>
        <View style={styles.bar}>
          <View style={styles.titleOnlySection}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop}]}>
      <View style={styles.bar}>
        <View
          onLayout={handleLeftLayout}
          style={[styles.sideFlex, hasBack && styles.sideWithPadding]}>
          {hasBack ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={handleBackPress}
              style={styles.backButton}>
              <Text style={styles.backChevron}>{'\u2039'}</Text>
              <Text numberOfLines={1} style={styles.backTitle}>
                {backTitle}
              </Text>
            </Pressable>
          ) : null}
        </View>

        <View
          onLayout={handleRightLayout}
          style={[
            styles.sideFlex,
            hasActions && styles.rightWithActions,
            hasActions && hasBack && styles.rightWithActionsAndBack,
          ]}>
          {buttons.map((button, index) => (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              key={`${button.iconName}-${index}`}
              onPress={button.onPress}
              style={styles.actionButton}>
              <Icon name={button.iconName} />
            </Pressable>
          ))}
        </View>

        <View style={[styles.titleOverlay, {left: titleInset, right: titleInset}]}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

TobBar.displayName = 'TobBar';
