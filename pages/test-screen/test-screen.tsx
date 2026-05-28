import React from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';

import {TobBar} from '../../components/TobBar/TobBar';

const showActionAlert = (action: string) => {
  Alert.alert('Action', action);
};

export const TestScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TobBar title="Title only" />

      <View style={styles.spacer} />

      <TobBar backTitle="Parent Title" onBackPress={() => showActionAlert('Back pressed')} title="Title + back" />

      <View style={styles.spacer} />

      <TobBar
        buttons={[{iconName: 'share', onPress: () => showActionAlert('Share pressed')}]}
        title="Title + 1 action"
      />

      <View style={styles.spacer} />

      <TobBar
        backTitle="Parent Title"
        buttons={[{iconName: 'edit', onPress: () => showActionAlert('Edit pressed')}]}
        onBackPress={() => showActionAlert('Back pressed')}
        title="Title + back + 1 action"
      />

      <View style={styles.spacer} />

      <TobBar
        backTitle="Parent Title"
        buttons={[
          {iconName: 'add', onPress: () => showActionAlert('Add pressed')},
          {iconName: 'search', onPress: () => showActionAlert('Search pressed')},
          {iconName: 'more', onPress: () => showActionAlert('More pressed')},
        ]}
        onBackPress={() => showActionAlert('Back pressed')}
        title="Title + back + 3 actions"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  spacer: {
    height: 24,
  },
});
