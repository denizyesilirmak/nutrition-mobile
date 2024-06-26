# ScreenView Component

The `ScreenView` component is a flexible container for screens in React Native applications. It can optionally be scrollable and allows for custom styling.

## Props

The component accepts the following props:

- `children`: React.ReactNode - The content to be displayed within the `ScreenView`. This can be any valid React node.
- `scrollable`: boolean (optional) - Determines whether the content is scrollable. If `true`, the content can be scrolled; otherwise, it is fixed.
- `style`: StyleProp<ViewStyle> (optional) - Custom styles to apply to the `ScreenView`. This can be any style object that is compatible with React Native's `ViewStyle`.

## Usage

Here's an example of how to use the `ScreenView` component:

```jsx
import React from 'react';
import { Text } from 'react-native';
import ScreenView from './ScreenView';

const MyScreen = () => {
  return (
    <ScreenView scrollable={true} style={{ padding: 20 }}>
      <Text>This is a scrollable screen.</Text>
    </ScreenView>
  );
};

export default MyScreen;