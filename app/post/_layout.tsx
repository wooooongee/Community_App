import { colors } from "@/constants";
import Foundation from "@expo/vector-icons/Foundation";
import { Link, Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: "글쓰기",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace>
              <Foundation name="arrow-left" size={28} color={"black"} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
