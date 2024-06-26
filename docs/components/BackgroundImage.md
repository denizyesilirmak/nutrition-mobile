# BackgroundImage Component

The `BackgroundImage` component is a simple wrapper around the `ImageBackground` component from React Native. It is designed to make it easier to use background images in your React Native applications.

## Props

The component accepts the following props:

- `source`: (required) Specifies the source of the image to be used as a background. It can be a local file or a remote URL.

## Usage

To use the `BackgroundImage` component, you need to import it into your file and then use it like any other React component. Here's an example:

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import BackgroundImage from './path/to/BackgroundImage';

const MyComponent = () => {
  return (
    <BackgroundImage source={require('./path/to/image.jpg')}>
      <View>
        <Text>Content on top of the background image</Text>
      </View>
    </BackgroundImage>
  );
};

export default MyComponent;