import React, {FC, useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ChevronLeftIcon, Icon} from './Icon';
import styles, {DEFAULT_TOP_INSET} from './TobBar.style';
import {ITobBarController} from './TobBar.model';

export const TobBar: FC<ITobBarController> = (props) => {
  const {title, backTitle, onBackPress, buttons = []} = props;
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const hasBack = Boolean(backTitle);
  const hasActions = buttons.length > 0;
  const isTitleOnly = !hasBack && !hasActions;

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
        <View style={[styles.sideFlex, hasBack && styles.sideWithPadding]}>
          {hasBack ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={handleBackPress}
              style={styles.backButton}>
              <ChevronLeftIcon />
              <Text numberOfLines={1} style={styles.backTitle}>
                {backTitle}
              </Text>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.centerSection}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>

        <View style={[styles.sideFlex, hasActions && styles.rightWithActions]}>
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
  );
};

TobBar.displayName = 'TobBar';
