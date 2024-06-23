import FoodListItem from "@/src/components/FoodListItem";
import ScreenView from "@/src/components/ScreenView";
import SearchBar from "@/src/components/SearchBar";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";

const dummyFoods = [
  {
    id: "1",
    name: "Karnıyarık",
    description:
      "Karnıyarık is a traditional Turkish dish made of eggplant, onions, and minced meat.",
    image:
      "https://d17wu0fn6x6rgz.cloudfront.net/img/w/tarif/mgt/frnda-karnyark-313.webp",
  },
  {
    id: "2",
    name: "Kumpir",
    description:
      "Kumpir is a Turkish baked potato dish that is popular in Istanbul.",
    image:
      "https://images.deliveryhero.io/image/fd-tr/LH/ydxu-hero.jpg?width=512&height=384&quality=45",
  },
  {
    id: "3",
    name: "Köfte",
    description:
      "Köfte is a Turkish meatball dish that is popular in Istanbul.",
    image:
      "https://cdn.ye-mek.net/App_UI/Img/out/650/2022/12/ev-koftesi-resimli-yemek-tarifi(12).jpg",
  },
];

const FoodsScreen = () => {
  return (
    <ScreenView>
      <StatusBar style="dark" animated />
      <SearchBar />
      <FlashList
        data={dummyFoods}
        keyExtractor={(food) => food.id}
        renderItem={({ item }) => <FoodListItem food={item} />}
        estimatedItemSize={122}
      />
    </ScreenView>
  );
};

export default FoodsScreen;
