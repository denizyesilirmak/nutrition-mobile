import { ImageBackground, ImageBackgroundProps } from "react-native";

const BackgroundImage = ({ source }: ImageBackgroundProps) => {
  return <ImageBackground source={source} />;
};

export default BackgroundImage;
