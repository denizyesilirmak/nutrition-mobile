import FoodListItem from "@/src/components/FoodListItem";
import ScreenView from "@/src/components/ScreenView";
import SearchBar from "@/src/components/SearchBar";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";

const dummyFoods = [
  {
    id: "1",
    name: "Burito",
    description:
      "Burito is a Mexican dish that consists of a flour tortilla with various ingredients.",
    image:
      "https://images.pexels.com/photos/14979836/pexels-photo-14979836/free-photo-of-burrito-in-close-up-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
  {
    id: "4",
    name: "Pizza",
    description:
      "Pizza is an Italian dish that consists of a flat round base of dough baked with a topping.",
    image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
  },
  {
    id: "5",
    name: "Sushi",
    description:
      "Sushi is a Japanese dish consisting of small balls or rolls of vinegar-flavored cold rice served with a garnish of raw fish, vegetables, or egg.",
    image:
      "https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "6",
    name: "Taco",
    description:
      "Taco is a Mexican dish consisting of a folded or rolled tortilla filled with various mixtures.",
    image:
      "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "7",
    name: "Waffle",
    description:
      "Waffle is a dish made from leavened batter or dough that is cooked between two plates that are patterned to give a characteristic size, shape, and surface impression.",
    image:
      "https://images.pexels.com/photos/3023740/pexels-photo-3023740.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "8",
    name: "Yogurt",
    description: "Yogurt is a food produced by bacterial fermentation of milk.",
    image:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "9",
    name: "Zucchini",
    description:
      "Zucchini is a summer squash that is typically dark or light green.",
    image:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
