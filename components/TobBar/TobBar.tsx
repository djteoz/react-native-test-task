import React, {FC, useCallback, useState} from 'react';
import {LayoutChangeEvent, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Icon} from './Icon';
import styles, {DEFAULT_TOP_INSET, MIN_TITLE_INSET} from './TobBar.style';
import {ITobBarController} from './TobBar.model';

export const TobBar: FC<ITobBarController> = (props) => {
  const {title, backTitle, onBackPress, buttons = []} = props;
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  const handleLeftLayout = useCallback((event: LayoutChangeEvent) => {
    setLeftWidth(event.nativeEvent.layout.width);
  }, []);

  const handleRightLayout = useCallback((event: LayoutChangeEvent) => {
    setRightWidth(event.nativeEvent.layout.width);
  }, []);

  const titleInset = Math.max(leftWidth, rightWidth, MIN_TITLE_INSET);

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

  return (
    <View style={[styles.container, {paddingTop}]}>
      <View style={styles.bar}>
        <View style={styles.sideSection}>
          <View onLayout={handleLeftLayout} style={styles.sideContent}>
            {backTitle ? (
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
        </View>

        <View style={[styles.titleContainer, {left: titleInset, right: titleInset}]}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>

        <View style={[styles.sideSection, styles.rightSection]}>
          <View onLayout={handleRightLayout} style={styles.sideContent}>
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
        </View>
      </View>
    </View>
  );
};

TobBar.displayName = 'TobBar';
