import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import tw from 'twrnc';

export type UiButtonProps = {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  rounded?: number; // border radius
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  size?: 'sm' | 'md' | 'lg';
};

export default function UiButton({
  label,
  onPress,
  backgroundColor = '#6B5DEB',
  textColor = '#FFFFFF',
  disabled = false,
  loading = false,
  rounded = 16,
  style,
  textStyle,
  size = 'md',
}: UiButtonProps) {
  const sizePadding = size === 'sm' ? tw`px-5 py-6 mx-3` : size === 'lg' ? tw`px-5 py-6 mx-3` : tw`px-5 py-6 mx-3`;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        sizePadding,
        tw`items-center justify-center`,
        { backgroundColor: disabled ? '#E5E7EB' : backgroundColor, borderRadius: rounded, opacity: disabled ? 0.7 : 1 },
        style as any,
      ]}
    >
      {loading ? (
        <View style={tw`flex-row items-center`}>
          <ActivityIndicator color={textColor} size="small" />
          <Text style={[{ color: textColor, marginLeft: 8, fontWeight: '700' }, textStyle as any]}>{label}</Text>
        </View>
      ) : (
        <Text style={[{ color: textColor, fontWeight: '700' }, textStyle as any]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}


