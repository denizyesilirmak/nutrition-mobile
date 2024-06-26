# Image Component

The `Image` component is a wrapper around the `Image` component from React Native (`RNImage`). It is designed to simplify the usage of images in your React Native application by directly passing all received props to the underlying `RNImage` component.

## Props

The component accepts all props that the standard React Native `Image` component accepts (`ImageProps`). This includes:

- `source`: An object specifying the URI of the image to display.
- `style`: An object specifying the styling of the image, such as `width`, `height`, `borderRadius`, etc.
- Various event handlers like `onLoad`, `onError`, and more.

Refer to the [React Native Image documentation](https://reactnative.dev/docs/image) for a full list of available props.

## Usage

Here's an example of how to use the `Image` component:

```jsx
import React from 'react';
import { View } from 'react-native';
import Image from './path/to/Image';

const App = () => {
  return (
    <View>
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
    </View>
  );
};

export default App;