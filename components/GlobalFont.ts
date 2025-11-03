import { Platform, Text, TextInput } from 'react-native';

// Set a global default font for all Text and TextInput components.
// If "SF Pro" is available (iOS system or custom added font), it will be used.
// Otherwise, React Native will fall back to the platform default.
const defaultFontFamily = Platform.select({ ios: 'System', android: 'SF Pro' }) || 'SF Pro';

// Apply to Text
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyText: any = Text as any;
anyText.defaultProps = anyText.defaultProps || {};
anyText.defaultProps.style = [anyText.defaultProps.style, { fontFamily: defaultFontFamily }];

// Apply to TextInput as well (for consistency)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyTextInput: any = TextInput as any;
anyTextInput.defaultProps = anyTextInput.defaultProps || {};
anyTextInput.defaultProps.style = [anyTextInput.defaultProps.style, { fontFamily: defaultFontFamily }];

export {};


