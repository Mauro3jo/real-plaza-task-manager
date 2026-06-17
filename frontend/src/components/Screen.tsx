import React, {PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}>;

export function Screen({
  children,
  contentStyle,
  edges = ['top', 'left', 'right'],
  style,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.safeArea, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F6F7F9',
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
