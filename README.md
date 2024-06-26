# Nutirition Mobile

## Documentation

- [Project Scope](docs/PROJECT_SCOPE.md)

### Components

- [BackgroundImage](docs/components//BackgroundImage.md)
- [Button](docs/components//Button.md)
- [Checkbox](docs/components//Checkbox.md)
- [DatePicker](docs/components//DatePicker.md)
- [FoodDetector](docs/components//FoodDetector.md)
- [FoodListItem](docs/components//FoodListItem.md)
- [Image](docs/components//Image.md)
- [ScreenView](docs/components//ScreenView.md)
- [SearchBar](docs/components//SearchBar.md)
- [Seperator](docs/components//Seperator.md)

## About

### Description

This is a mobile application that allows users to track their daily nutrition intake. Users can input their daily meals and the app will calculate the total calories, protein, fat, and carbohydrates consumed. The app will also provide a summary of the user's daily nutrition intake.

### Features

- User authentication
- Add meals
- View daily nutrition summary
- View weekly nutrition summary
- View monthly nutrition summary
- View nutrition history

### Technologies

- React Native (Expo)
- Zustand
- ML Kit
- Expo Router
- React Query
- Flash List
- EAS Build
- EAS Submit
- EAS Update

### Development

### Installation

1. Clone the repository

```bash
git clone git@github.com:denizyesilirmak/nutrition-mobile.git
```

2. Install dependencies

```bash
cd nutrition-mobile
npm install
```

3. Start the app

```bash
npm start
npx run:ios --device
npx run:android --device
```