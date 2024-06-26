# FoodListItem Component

`FoodListItem` is a React component designed for use in React Native applications. It displays a list item representing a food item, including its image, name, description, and nutritional value chips.

## Props

The component accepts a single prop:

- `food`: An object representing the food item. It must have the following structure:
  - `id`: A string representing the unique identifier of the food item.
  - `name`: A string representing the name of the food item.
  - `description`: A string providing a brief description of the food item.
  - `image`: A string URL pointing to the image of the food item.

## Usage

Here's an example of how to use the `FoodListItem` component:

```jsx
import React from 'react';
import { View } from 'react-native';
import FoodListItem from './path/to/FoodListItem';

const foodItem = {
  id: '1',
  name: 'Apple',
  description: 'A fresh red apple',
  image: 'https://example.com/apple.jpg',
};

const App = () => {
  return (
    <View>
      <FoodListItem food={foodItem} />
    </View>
  );
};

export default App;