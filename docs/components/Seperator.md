# Seperator Component

The `Seperator` component is a simple, reusable component designed to visually separate content within a React Native application. It utilizes a `View` component styled with custom styles defined in an external stylesheet.

## Styles

The component relies on a `styles` object imported from a separate file (`./styles`). The specific style used is `styles.line`, which should define the appearance of the separator line. The exact styling (such as height, width, color, and margins) is customizable and defined within the `styles` file.

## Usage

This component can be used in various parts of an application where a visual separation between different UI elements is necessary. It is especially useful in lists, forms, or between sections of content.

## Example

Assuming the `styles.line` is defined as follows in the `styles.js` file:

```javascript
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
});