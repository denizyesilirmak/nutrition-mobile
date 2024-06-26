# Checkbox Component

This component creates a customizable checkbox using React Native's `Pressable` and `View` components, along with the `Ionicons` icon library for the checkmark and a custom `Text` component for the label.

## Props

- `value`: A `boolean` indicating whether the checkbox is checked.
- `onChange`: An optional function that is called with the new value (`true` or `false`) when the checkbox is pressed.
- `label`: A `string` that represents the text label associated with the checkbox.

## Features

- **Interactive**: Toggles its state between checked and unchecked on press.
- **Customizable Appearance**: The checkbox's appearance can be customized. It includes a border, a specified width and height, and a checkmark icon when checked.
- **Label Support**: Displays a label next to the checkbox.

## Example Usage

```tsx
<Checkbox
  value={isChecked}
  onChange={setChecked}
  label="Accept Terms"
/>