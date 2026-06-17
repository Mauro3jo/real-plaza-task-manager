import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/appStyles';
import {type BadgeColors} from '../theme/theme';

type BadgeProps = {
  colors: BadgeColors;
  label: string;
};

export function Badge({colors, label}: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
        },
      ]}>
      <Text style={[styles.badgeText, {color: colors.color}]}>{label}</Text>
    </View>
  );
}
