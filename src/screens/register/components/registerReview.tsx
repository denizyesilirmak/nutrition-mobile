import { Text, View } from "react-native";

type RegisterPersonalProps = {
  name: string;
  lastName: string;
};

const RegisterReview = ({ name, lastName }: RegisterPersonalProps) => {
  return (
    <View className="flex-1 gap-4">
      <Text className="text-2xl font-bold dark:color-white">
        Hey {name} {lastName}! 🎉
      </Text>
      <Text className="text-md dark:text-gray-300">
        You're about to start your journey with EatInside! 🚀
      </Text>
      <Text className="text-sm dark:text-gray-300">
        We reserve the right to make changes to this Privacy Policy at any time
        and for any reason. We will alert you about any changes by updating the
        “Last updated” date of this Privacy Policy. You are encouraged to
        periodically review this Privacy Policy to stay informed of updates. You
        will be deemed to have been made aware of, will be subject to, and will
        be deemed to have accepted the changes in any revised Privacy Policy by
        your continued use of the Application after the date such revised
        Privacy Policy is posted.
      </Text>

      <Text className="text-sm dark:text-gray-300">
        Information our servers automatically collect when you access the
        Application, such as your native actions that are integral to the
        Application, including liking, re-blogging, or replying to a post, as
        well as other interactions with the Application and other users via
        server log files.
      </Text>

      <Text className="text-md font-semibold dark:text-gray-300">
        By registering to EatInside, you agree to our Terms of Service and
        Privacy Policy. 🤝
      </Text>
    </View>
  );
};

export default RegisterReview;
