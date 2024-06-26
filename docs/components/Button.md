# Button Component

This component creates a customizable button using React Native's `Pressable` and `View` components, along with a custom `Text` component for the button's label.

## Props

- `label`: A `string` that represents the text to be displayed on the button.
- `onPress`: A function to be called when the button is pressed.

## Features

- **Customizable Appearance**: The button's appearance is customizable through TailwindCSS-like classes for styling. It includes rounded corners, a border, and a semi-transparent background.
- **Press Effect**: Changes the button's opacity on press to give visual feedback to the user.
- **Text Customization**: The text inside the button can be customized in terms of color, size, weight, and additional styling (e.g., margin).

## Example Usage

```tsx
<Button
  label="Click Me"
  onPress={() => {
    console.log('Button Pressed');
  }}
/>