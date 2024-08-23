import { Image as ExpoImage, ImageProps } from "expo-image";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

const Image = (props: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View>
      {!loaded && (
        <View
          style={[
            props.style,
            {
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 1,
            },
          ]}
        >
          <ActivityIndicator
            size="small"
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
      )}
      <ExpoImage
        onLoad={() => {
          setLoaded(true);
        }}
        onLoadEnd={() => {
          setLoaded(true);
        }}
        {...props}
        style={[props.style, { borderRadius: 24, opacity: loaded ? 1 : 0 }]}
      />
    </View>
  );
};

export default Image;
