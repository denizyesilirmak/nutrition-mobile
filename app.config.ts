import type { ExpoConfig } from "@expo/config-types";

const config: ExpoConfig = {
  name: "nutrition-mobile",
  slug: "nutrition-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#F5C998",
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.nutrition.mobile",
    infoPlist: {
      NSAppTransportSecurity: { NSAllowsArbitraryLoads: true },
    },
  },
  android: {
    package: "com.nutrition.mobile",
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/favicon.png",
  },
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "d68b65a6-b470-4c9e-91b0-b60d857b87c3",
    },
  },
  plugins: [
    "expo-router",
    // [
    //   "react-native-vision-camera",
    //   {
    //     cameraPermissionText: "$(PRODUCT_NAME) needs access to your Camera.",

    //     // optionally, if you want to record audio:
    //     enableMicrophonePermission: true,
    //     microphonePermissionText:
    //       "$(PRODUCT_NAME) needs access to your Microphone.",
    //   },
    // ],
    // [
    //   "react-native-fast-tflite",
    //   {
    //     enableCoreMLDelegate: true,
    //   },
    // ],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 34,
          targetSdkVersion: 34,
          buildToolsVersion: "34.0.0",
          kotlinVersion: "1.9.0",
        },
        ios: {
          deploymentTarget: "13.4",
        },
      },
    ],
  ],
};

export default config;
