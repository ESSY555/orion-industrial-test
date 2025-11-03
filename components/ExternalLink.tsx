import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, Linking, Text } from 'react-native';

export function ExternalLink(
  props: { href: string; children?: React.ReactNode; style?: any }
) {
  const { href, children, style } = props;
  const onPress = async () => {
    if (Platform.OS !== 'web') {
      await WebBrowser.openBrowserAsync(href);
    } else {
      await Linking.openURL(href);
    }
  };
  return (
    <Text style={style} onPress={onPress}>
      {children ?? href}
    </Text>
  );
}
