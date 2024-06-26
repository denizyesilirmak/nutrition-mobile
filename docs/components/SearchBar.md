# SearchBar Component

The `SearchBar` component is a custom input field designed for searching, with an integrated button for triggering a scan action. It is styled to fit within a React Native application and uses the `@expo/vector-icons` for the scan icon.

## Structure

The component is structured into two main parts:

1. **TextInput Field**: Allows users to input their search queries.
2. **Pressable Scan Button**: A button that triggers a predefined action, in this case, navigating to a "scanfood" route using `expo-router`.

## Styles

The component uses inline styling to achieve its appearance. The main styles include:

- A white background with a slight padding for the outer `View`.
- A bordered, rounded rectangle for the inner `View` that contains the text input and button.
- The text input takes up the majority of the space, with padding to separate it from the scan button.
- The scan button is styled to align in the center and has a border to visually separate it from the text input.

## Functionality

- The text input allows users to enter search queries with a placeholder hint.
- The scan button, when pressed, navigates the user to a "scanfood" route, indicating an action to scan food items.

## Usage

This component can be used in any screen of a React Native application where a search functionality is required, especially when an additional action like scanning is needed alongside searching.

## Example

```jsx
import React from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar';

const MyScreen = () => {
  return (
    <View>
      <SearchBar />
    </View>
  );
};

export default MyScreen;