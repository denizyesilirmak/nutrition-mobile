# DatePicker Component

The `DatePicker` component is a custom date picker built with React Native, utilizing several external libraries to enhance its functionality. It displays a horizontal list of dates that the user can scroll through. When scrolling, a haptic feedback is triggered at certain intervals to enhance the user experience.

## Dependencies

- `@shopify/flash-list`: A performant React Native list component.
- `date-fns`: A library for manipulating JavaScript dates in a comprehensive way.
- `react-native`: The core library for building React Native applications.
- `react-native-reanimated`: A library to animate React Native's views with high performance.
- `expo-haptics`: Provides access to the haptic (vibration) feedback capabilities of the device.
- `react-native-worklets-core`: Used for managing shared values across the React Native and Reanimated worklets.

## Props

This component does not accept any props.

## Features

- **Horizontal Scrolling**: Dates are displayed in a horizontal list that can be scrolled through.
- **Haptic Feedback**: Provides a physical feedback by vibrating when the user scrolls to a new date interval.
- **Dynamic Date Generation**: Automatically generates a list of dates, starting from 30 days before the current date up to 2 days after the current date.
- **Custom Styling**: Each date item is styled with a white background, centered text, and rounded borders.

## Usage

To use the `DatePicker` component, simply import it into your React Native application and include it in your component tree:

```jsx
import DatePicker from './DatePicker';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <DatePicker />
    </View>
  );
};

export default App;